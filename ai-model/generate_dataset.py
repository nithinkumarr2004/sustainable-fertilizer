"""
Script to generate sample fertilizer recommendation dataset
"""
import pandas as pd
import numpy as np
import os

np.random.seed(42)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_PATH = os.path.join(BASE_DIR, 'soil_fertilizer_dataset.csv')

# Generate sample data
n_samples = 2000

data = {
    'nitrogen': np.random.uniform(0, 100, n_samples),
    'phosphorus': np.random.uniform(0, 100, n_samples),
    'potassium': np.random.uniform(0, 100, n_samples),
    'ph': np.random.uniform(4.0, 8.5, n_samples),
    'moisture': np.random.uniform(20, 80, n_samples),
    'temperature': np.random.uniform(15, 35, n_samples),
    'crop_type': np.random.choice(['Wheat', 'Rice', 'Corn', 'Soybean', 'Cotton', 'Tomato', 'Potato', 'Sugarcane'], n_samples)
}

df = pd.DataFrame(data)

# Define fertilizer recommendation rules based on nutrient levels and crop type
def recommend_fertilizer(row):
    n = row['nitrogen']
    p = row['phosphorus']
    k = row['potassium']
    ph = row['ph']
    crop = row['crop_type']
    
    # Crop-specific base recommendations
    crop_preferences = {
        'Wheat': {'prefers': 'N', 'needs_high_n': True},
        'Rice': {'prefers': 'N', 'needs_high_n': True},
        'Corn': {'prefers': 'N', 'needs_high_n': True},
        'Soybean': {'prefers': 'P', 'needs_high_p': True, 'fixes_n': True},
        'Cotton': {'prefers': 'K', 'needs_high_k': True},
        'Tomato': {'prefers': 'Mixed', 'needs_balanced': True},
        'Potato': {'prefers': 'P', 'needs_high_p': True},
        'Sugarcane': {'prefers': 'K', 'needs_high_k': True}
    }
    
    crop_info = crop_preferences.get(crop, {'prefers': 'Mixed'})
    
    # Nitrogen deficiency
    if n < 30:
        if p < 25 and k < 30:
            return 'Mixed'
        # Crops that need high N get N fertilizer even if slightly deficient
        if crop_info.get('needs_high_n') and n < 40:
            return 'N'
        return 'N'
    # Phosphorus deficiency
    elif p < 25:
        if k < 30:
            return 'Mixed'
        # Crops that need high P get P fertilizer
        if crop_info.get('needs_high_p'):
            return 'P'
        return 'P'
    # Potassium deficiency
    elif k < 30:
        # Crops that need high K get K fertilizer
        if crop_info.get('needs_high_k'):
            return 'K'
        return 'K'
    # Balanced - check crop preference
    elif 30 <= n <= 70 and 25 <= p <= 60 and 30 <= k <= 70:
        # Soybean fixes nitrogen, so organic is better
        if crop == 'Soybean':
            return 'Organic'
        # Crops that prefer balanced nutrition
        if crop_info.get('needs_balanced'):
            return 'Organic'
        # Otherwise use crop preference
        if crop_info['prefers'] == 'Mixed':
            return 'Mixed'
        return 'Organic'
    # Mixed needed
    else:
        return 'Mixed'

def calculate_quantity(row):
    # Crop-specific base quantities (kg/acre)
    crop_base_quantities = {
        'Wheat': 60,
        'Rice': 80,
        'Corn': 70,
        'Soybean': 40,  # Fixes nitrogen, needs less
        'Cotton': 65,
        'Tomato': 55,
        'Potato': 75,
        'Sugarcane': 90
    }
    
    crop = row['crop_type']
    base_quantity = crop_base_quantities.get(crop, 50)
    
    n = row['nitrogen']
    p = row['phosphorus']
    k = row['potassium']
    
    # Calculate deficiency
    n_deficit = max(0, 50 - n)
    p_deficit = max(0, 40 - p)
    k_deficit = max(0, 50 - k)
    
    total_deficit = n_deficit + p_deficit + k_deficit
    quantity = base_quantity + (total_deficit * 1.5)
    
    # Crop-specific adjustments
    if crop in ['Rice', 'Sugarcane']:
        quantity *= 1.1  # Need more fertilizer
    elif crop == 'Soybean':
        quantity *= 0.8  # Needs less (fixes N)
    
    return min(quantity, 200)  # Cap at 200 kg/acre

def calculate_soil_health_score(row):
    n = row['nitrogen']
    p = row['phosphorus']
    k = row['potassium']
    ph = row['ph']
    moisture = row['moisture']
    crop = row['crop_type']
    
    # Crop-specific optimal ranges
    crop_optimal_ranges = {
        'Wheat': {'n': (40, 70), 'p': (25, 50), 'k': (30, 70), 'ph': (6.0, 7.5)},
        'Rice': {'n': (50, 80), 'p': (20, 45), 'k': (30, 70), 'ph': (5.5, 7.0)},
        'Corn': {'n': (50, 80), 'p': (25, 50), 'k': (30, 70), 'ph': (6.0, 7.5)},
        'Soybean': {'n': (30, 60), 'p': (30, 60), 'k': (30, 70), 'ph': (6.0, 7.0)},
        'Cotton': {'n': (40, 70), 'p': (25, 50), 'k': (40, 80), 'ph': (5.5, 8.0)},
        'Tomato': {'n': (40, 70), 'p': (30, 60), 'k': (40, 80), 'ph': (6.0, 7.0)},
        'Potato': {'n': (40, 70), 'p': (30, 60), 'k': (30, 70), 'ph': (5.0, 6.5)},
        'Sugarcane': {'n': (50, 80), 'p': (25, 50), 'k': (40, 80), 'ph': (6.0, 7.5)}
    }
    
    optimal = crop_optimal_ranges.get(crop, {'n': (40, 70), 'p': (25, 50), 'k': (30, 70), 'ph': (6.0, 7.5)})
    
    # Calculate scores based on crop-specific optimal ranges
    n_min, n_max = optimal['n']
    if n_min <= n <= n_max:
        n_score = 100
    elif n < n_min:
        n_score = (n / n_min) * 100
    else:
        n_score = max(70, 100 - ((n - n_max) / (100 - n_max)) * 30)
    
    p_min, p_max = optimal['p']
    if p_min <= p <= p_max:
        p_score = 100
    elif p < p_min:
        p_score = (p / p_min) * 100
    else:
        p_score = max(70, 100 - ((p - p_max) / (100 - p_max)) * 30)
    
    k_min, k_max = optimal['k']
    if k_min <= k <= k_max:
        k_score = 100
    elif k < k_min:
        k_score = (k / k_min) * 100
    else:
        k_score = max(70, 100 - ((k - k_max) / (100 - k_max)) * 30)
    
    # pH optimal range (crop-specific)
    ph_min, ph_max = optimal['ph']
    if ph_min <= ph <= ph_max:
        ph_score = 100
    elif ph < ph_min:
        ph_score = 50 + ((ph - 4.0) / (ph_min - 4.0)) * 50
    else:
        ph_score = 100 - ((ph - ph_max) / (8.5 - ph_max)) * 30
    
    # Moisture optimal range 40-60%
    if 40 <= moisture <= 60:
        moisture_score = 100
    elif moisture < 40:
        moisture_score = (moisture / 40) * 100
    else:
        moisture_score = 100 - ((moisture - 60) / 20) * 50
    
    avg_score = (n_score + p_score + k_score + ph_score + moisture_score) / 5
    return round(avg_score, 2)

df['fertilizer_type'] = df.apply(recommend_fertilizer, axis=1)
df['quantity_kg_per_acre'] = df.apply(calculate_quantity, axis=1)
df['soil_health_score'] = df.apply(calculate_soil_health_score, axis=1)

# Save to CSV
df.to_csv(OUTPUT_PATH, index=False)
print(f"Dataset generated successfully with {len(df)} samples!")
print(f"Saved to: {OUTPUT_PATH}")
print(f"\nFertilizer type distribution:")
print(df['fertilizer_type'].value_counts())
print(f"\nSoil health score statistics:")
print(df['soil_health_score'].describe())
