const axios = require('axios');

/**
 * Service to fetch automated soil and weather data based on GPS coordinates
 */

// OpenWeatherMap API details (Farmer would ideally provide their own key)
// Using a mock fallback for demonstration if key is missing
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

/**
 * Helper to generate a stable pseudo-random value based on coordinates
 * to ensure consistency for the same location when data is missing.
 */
const getStableValue = (lat, lon, seed, base, range) => {
  const hash = Math.abs(Math.sin(lat * 12.9898 + lon * 78.233 + seed) * 43758.5453);
  return base + (hash % range);
};

/**
 * Fetches real-time weather data
 * @param {number} lat Latitude
 * @param {number} lon Longitude
 */
exports.getWeatherData = async (lat, lon) => {
  try {
    if (!OPENWEATHER_API_KEY) {
      console.warn('⚠️ OPENWEATHER_API_KEY missing in .env. Using estimated weather data.');
      return {
        temperature: getStableValue(lat, lon, 1, 20, 10), // Stable 20-30°C
        humidity: getStableValue(lat, lon, 2, 50, 20)     // Stable 50-70%
      };
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    const response = await axios.get(url);

    return {
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      locationName: `${response.data.name}, ${response.data.sys.country}`
    };
  } catch (error) {
    console.error('Weather API Error:', error.message);
    return {
      temperature: 25,
      humidity: 60,
      locationName: 'Unknown Location'
    }; // Safe fallback
  }
};

/**
 * Fetches soil properties from ISRIC SoilGrids API
 * @param {number} lat Latitude
 * @param {number} lon Longitude
 */
exports.getSoilGridsData = async (lat, lon) => {
  try {
    const url = `https://rest.isric.org/soilgrids/v2.0/properties/query?lat=${lat}&lon=${lon}&property=nitrogen&property=phh2o&layer=0-5cm&vo=mean`;

    const response = await axios.get(url);
    const properties = response.data.properties?.layers;

    const getValue = (label) => {
      if (!properties) return null;
      const layer = properties.find(l => l.name === label);
      if (layer && layer.depths[0].values.mean) {
        return layer.depths[0].values.mean;
      }
      return null;
    };

    const rawN = getValue('nitrogen');
    const nitrogen = rawN ? Math.min(100, rawN / 4) : getStableValue(lat, lon, 3, 40, 20);

    const rawPH = getValue('phh2o');
    const ph = rawPH ? rawPH / 10 : getStableValue(lat, lon, 4, 6.0, 1.5);

    return {
      nitrogen: Math.round(nitrogen * 10) / 10,
      ph: Math.round(ph * 10) / 10,
      phosphorus: Math.round(getStableValue(lat, lon, 5, 30, 15) * 10) / 10, // Consistent estimate
      potassium: Math.round(getStableValue(lat, lon, 6, 35, 15) * 10) / 10    // Consistent estimate
    };
  } catch (error) {
    console.error('SoilGrids API Error:', error.message);
    return {
      nitrogen: Math.round(getStableValue(lat, lon, 3, 40, 20) * 10) / 10,
      ph: Math.round(getStableValue(lat, lon, 4, 6.0, 1.5) * 10) / 10,
      phosphorus: Math.round(getStableValue(lat, lon, 5, 30, 15) * 10) / 10,
      potassium: Math.round(getStableValue(lat, lon, 6, 35, 15) * 10) / 10
    };
  }
};

/**
 * Fetches granular address details using Nominatim (OpenStreetMap)
 * @param {number} lat Latitude
 * @param {number} lon Longitude
 */
exports.getDetailedAddress = async (lat, lon) => {
  try {
    // Nominatim requires a User-Agent header
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`;
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'SmartFertilizerApp/1.0'
      }
    });

    const addr = response.data.address;
    if (!addr) return null;

    // Priority for village/suburb/town for farmers
    const place = addr.village || addr.suburb || addr.town || addr.city || addr.hamlet || addr.neighbourhood;
    const district = addr.county || addr.district || addr.state_district;
    const state = addr.state;

    const parts = [place, district, state].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : (response.data.display_name || null);
  } catch (error) {
    console.error('Nominatim API Error:', error.message);
    return null; // Fallback to OWM
  }
};
