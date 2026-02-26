import React from 'react';
import { FaLeaf, FaFlask, FaSeedling, FaWater, FaSun, FaThermometerHalf } from 'react-icons/fa';

const About = () => {
  const fertilizerInfo = [
    {
      title: 'Nitrogen (N) Fertilizers',
      icon: <FaFlask className="text-3xl text-blue-600" />,
      description: 'Nitrogen is essential for plant growth and chlorophyll production. Common sources include urea, ammonium nitrate, and ammonium sulfate. Nitrogen promotes leaf and stem growth.',
      keyPoints: [
        'Essential for protein synthesis',
        'Promotes vegetative growth',
        'Deficiency causes yellowing leaves',
        'Most common nutrient deficiency'
      ]
    },
    {
      title: 'Phosphorus (P) Fertilizers',
      icon: <FaSeedling className="text-3xl text-purple-600" />,
      description: 'Phosphorus is crucial for root development, flowering, and fruit production. It plays a key role in energy transfer within plants. Common sources include superphosphate and triple superphosphate.',
      keyPoints: [
        'Critical for root development',
        'Essential for flowering and fruiting',
        'Improves crop quality',
        'Important for seed formation'
      ]
    },
    {
      title: 'Potassium (K) Fertilizers',
      icon: <FaLeaf className="text-3xl text-green-600" />,
      description: 'Potassium helps regulate water balance, improves disease resistance, and enhances fruit quality. Common sources include muriate of potash (KCl) and sulfate of potash.',
      keyPoints: [
        'Regulates water balance',
        'Improves disease resistance',
        'Enhances fruit quality',
        'Important for photosynthesis'
      ]
    },
    {
      title: 'Organic Fertilizers',
      icon: <FaSeedling className="text-3xl text-brown-600" />,
      description: 'Organic fertilizers are derived from natural sources like compost, manure, and bone meal. They improve soil structure and provide slow-release nutrients while being environmentally friendly.',
      keyPoints: [
        'Improves soil structure',
        'Slow-release nutrients',
        'Environmentally friendly',
        'Enhances microbial activity'
      ]
    },
    {
      title: 'Mixed/Compound Fertilizers',
      icon: <FaFlask className="text-3xl text-indigo-600" />,
      description: 'Mixed fertilizers contain two or more primary nutrients (N, P, K) in varying ratios. They provide balanced nutrition and are convenient for farmers who need multiple nutrients.',
      keyPoints: [
        'Balanced nutrition',
        'Convenient application',
        'Cost-effective',
        'Customizable NPK ratios'
      ]
    },
    {
      title: 'pH and Soil Acidity',
      icon: <FaWater className="text-3xl text-cyan-600" />,
      description: 'Soil pH affects nutrient availability. Most crops prefer pH between 6.0-7.5. Lime is used to raise pH (reduce acidity), while sulfur can lower pH (increase acidity).',
      keyPoints: [
        'Optimal range: 6.0-7.5',
        'Affects nutrient availability',
        'Can be adjusted with amendments',
        'Regular testing recommended'
      ]
    },
    {
      title: 'Moisture Management',
      icon: <FaWater className="text-3xl text-blue-500" />,
      description: 'Proper soil moisture is essential for nutrient uptake. Optimal moisture ranges from 40-60%. Both drought and waterlogging can affect fertilizer efficiency.',
      keyPoints: [
        'Optimal range: 40-60%',
        'Affects nutrient uptake',
        'Influences fertilizer efficiency',
        'Requires proper irrigation'
      ]
    },
    {
      title: 'Temperature Considerations',
      icon: <FaThermometerHalf className="text-3xl text-red-600" />,
      description: 'Soil temperature affects microbial activity and nutrient availability. Most crops grow best between 15-30°C. Temperature influences fertilizer breakdown and uptake rates.',
      keyPoints: [
        'Optimal range: 15-30°C',
        'Affects microbial activity',
        'Influences nutrient release',
        'Seasonal variations important'
      ]
    },
    {
      title: 'Crop-Specific Requirements',
      icon: <FaSeedling className="text-3xl text-yellow-600" />,
      description: 'Different crops have varying nutrient requirements at different growth stages. Understanding crop-specific needs helps optimize fertilizer application timing and amounts.',
      keyPoints: [
        'Varies by crop type',
        'Growth stage dependent',
        'Timing is crucial',
        'Customized recommendations needed'
      ]
    },
    {
      title: 'Sustainable Fertilizer Practices',
      icon: <FaLeaf className="text-3xl text-emerald-600" />,
      description: 'Sustainable practices include soil testing, precision application, crop rotation, and organic amendments. These practices reduce environmental impact while maintaining productivity.',
      keyPoints: [
        'Regular soil testing',
        'Precision application',
        'Crop rotation',
        'Long-term soil health focus'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">About Fertilizers</h1>
          <p className="text-xl text-primary-100">
            Comprehensive guide to fertilizers and soil management
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {fertilizerInfo.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0">
                  {item.icon}
                </div>
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{item.title}</h2>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <ul className="space-y-2">
                    {item.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-gray-700">
                        <span className="text-primary-600 mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Best Practices</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-primary-600">Before Application</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Conduct soil testing to determine nutrient levels</li>
                <li>✓ Check weather conditions (avoid rain forecasts)</li>
                <li>✓ Calculate correct application rates</li>
                <li>✓ Ensure proper storage of fertilizers</li>
                <li>✓ Use appropriate protective equipment</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-primary-600">During Application</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Apply at correct growth stages</li>
                <li>✓ Use calibrated equipment</li>
                <li>✓ Ensure even distribution</li>
                <li>✓ Avoid application near water bodies</li>
                <li>✓ Follow recommended timing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-primary-600">After Application</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Monitor crop response</li>
                <li>✓ Keep application records</li>
                <li>✓ Test soil periodically</li>
                <li>✓ Adjust practices based on results</li>
                <li>✓ Maintain soil health</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-primary-600">Environmental Considerations</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Prevent runoff into water bodies</li>
                <li>✓ Use buffer zones near sensitive areas</li>
                <li>✓ Consider organic alternatives</li>
                <li>✓ Practice crop rotation</li>
                <li>✓ Support biodiversity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
