import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaLeaf, FaFlask, FaSeedling, FaWater, FaThermometerHalf } from 'react-icons/fa';

const About = () => {
  const { t } = useTranslation();

  const fertilizerInfo = [
    {
      title: t('about.n_title'),
      icon: <FaFlask className="text-3xl text-blue-600" />,
      description: t('about.n_desc'),
      keyPoints: t('about.n_points', { returnObjects: true })
    },
    {
      title: t('about.p_title'),
      icon: <FaSeedling className="text-3xl text-purple-600" />,
      description: t('about.p_desc'),
      keyPoints: t('about.p_points', { returnObjects: true })
    },
    {
      title: t('about.k_title'),
      icon: <FaLeaf className="text-3xl text-green-600" />,
      description: t('about.k_desc'),
      keyPoints: t('about.k_points', { returnObjects: true })
    },
    {
      title: t('about.organic_title'),
      icon: <FaSeedling className="text-3xl text-brown-600" />,
      description: t('about.organic_desc'),
      keyPoints: t('about.organic_points', { returnObjects: true })
    },
    {
      title: t('about.mixed_title'),
      icon: <FaFlask className="text-3xl text-indigo-600" />,
      description: t('about.mixed_desc'),
      keyPoints: t('about.mixed_points', { returnObjects: true })
    },
    {
      title: t('about.ph_title'),
      icon: <FaWater className="text-3xl text-cyan-600" />,
      description: t('about.ph_desc'),
      keyPoints: t('about.ph_points', { returnObjects: true })
    },
    {
      title: t('about.moisture_title'),
      icon: <FaWater className="text-3xl text-blue-500" />,
      description: t('about.moisture_desc'),
      keyPoints: t('about.moisture_points', { returnObjects: true })
    },
    {
      title: t('about.temp_title'),
      icon: <FaThermometerHalf className="text-3xl text-red-600" />,
      description: t('about.temp_desc'),
      keyPoints: t('about.temp_points', { returnObjects: true })
    },
    {
      title: t('about.crop_title'),
      icon: <FaSeedling className="text-3xl text-yellow-600" />,
      description: t('about.crop_desc'),
      keyPoints: t('about.crop_points', { returnObjects: true })
    },
    {
      title: t('about.sustainable_title'),
      icon: <FaLeaf className="text-3xl text-emerald-600" />,
      description: t('about.sustainable_desc'),
      keyPoints: t('about.sustainable_points', { returnObjects: true })
    }
  ];

  const bestPractices = [
    { title: t('about.before_app'), points: t('about.before_points', { returnObjects: true }) },
    { title: t('about.during_app'), points: t('about.during_points', { returnObjects: true }) },
    { title: t('about.after_app'), points: t('about.after_points', { returnObjects: true }) },
    { title: t('about.env_cons'), points: t('about.env_points', { returnObjects: true }) }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">{t('about.title')}</h1>
          <p className="text-xl text-primary-100">
            {t('about.subtitle')}
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
                    {Array.isArray(item.keyPoints) && item.keyPoints.map((point, idx) => (
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
          <h2 className="text-3xl font-bold mb-6 text-gray-800">{t('about.best_practices')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {bestPractices.map((section, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold mb-3 text-primary-600">{section.title}</h3>
                <ul className="space-y-2 text-gray-700">
                  {Array.isArray(section.points) && section.points.map((point, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
