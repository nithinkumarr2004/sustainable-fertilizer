import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaNewspaper, FaVideo, FaFileAlt } from 'react-icons/fa';

const NewsEvents = () => {
  const newsItems = [
    {
      id: 1,
      title: 'New AI Model Improves Fertilizer Prediction Accuracy',
      date: '2024-11-15',
      category: 'Technology',
      description: 'Our latest machine learning model achieves 95% accuracy in fertilizer recommendations, helping farmers optimize nutrient application.',
      type: 'news',
      image: 'https://via.placeholder.com/400x250?text=AI+Model'
    },
    {
      id: 2,
      title: 'Sustainable Agriculture Workshop',
      date: '2024-11-20',
      category: 'Event',
      description: 'Join us for a comprehensive workshop on sustainable fertilizer practices and soil health management. Learn from industry experts.',
      type: 'event',
      location: 'Agriculture Research Center, City',
      image: 'https://via.placeholder.com/400x250?text=Workshop'
    },
    {
      id: 3,
      title: 'Farmers Report 30% Cost Reduction',
      date: '2024-11-10',
      category: 'Success Story',
      description: 'Over 500 farmers using our system report average cost savings of 30% on fertilizer expenses while maintaining crop yields.',
      type: 'news',
      image: 'https://via.placeholder.com/400x250?text=Success'
    },
    {
      id: 4,
      title: 'Organic Fertilizer Trends 2024',
      date: '2024-11-05',
      category: 'Research',
      description: 'New research highlights the growing trend towards organic fertilizers and their impact on soil health and crop productivity.',
      type: 'news',
      image: 'https://via.placeholder.com/400x250?text=Organic'
    },
    {
      id: 5,
      title: 'National Agriculture Conference',
      date: '2024-12-01',
      category: 'Event',
      description: 'The annual National Agriculture Conference features sessions on precision farming, AI in agriculture, and sustainable practices.',
      type: 'event',
      location: 'Convention Center, Capital City',
      image: 'https://via.placeholder.com/400x250?text=Conference'
    },
    {
      id: 6,
      title: 'Soil Health Monitoring Guidelines Released',
      date: '2024-10-28',
      category: 'Guidelines',
      description: 'New guidelines for soil health monitoring help farmers track nutrient levels and make informed fertilizer decisions.',
      type: 'news',
      image: 'https://via.placeholder.com/400x250?text=Guidelines'
    },
    {
      id: 7,
      title: 'Webinar: Precision Fertilizer Application',
      date: '2024-11-25',
      category: 'Webinar',
      description: 'Free online webinar covering precision fertilizer application techniques and best practices for different crop types.',
      type: 'event',
      location: 'Online',
      image: 'https://via.placeholder.com/400x250?text=Webinar'
    },
    {
      id: 8,
      title: 'Mobile App Update: New Features',
      date: '2024-11-08',
      category: 'Update',
      description: 'Latest app update includes offline mode, enhanced charts, and integration with weather data for better recommendations.',
      type: 'news',
      image: 'https://via.placeholder.com/400x250?text=App+Update'
    },
    {
      id: 9,
      title: 'Community Farm Visit Program',
      date: '2024-11-30',
      category: 'Event',
      description: 'Join us for guided visits to farms implementing smart fertilizer practices. Learn from real-world examples and network with other farmers.',
      type: 'event',
      location: 'Various Locations',
      image: 'https://via.placeholder.com/400x250?text=Farm+Visit'
    },
    {
      id: 10,
      title: 'Research: Impact of Climate on Fertilizer Efficiency',
      date: '2024-10-20',
      category: 'Research',
      description: 'New study explores how changing climate patterns affect fertilizer efficiency and provides recommendations for adaptation strategies.',
      type: 'news',
      image: 'https://via.placeholder.com/400x250?text=Climate'
    },
    {
      id: 11,
      title: 'Expert Panel Discussion: Future of Farming',
      date: '2024-12-10',
      category: 'Panel',
      description: 'Industry leaders discuss the future of agriculture, focusing on technology, sustainability, and food security challenges.',
      type: 'event',
      location: 'University Auditorium',
      image: 'https://via.placeholder.com/400x250?text=Panel'
    },
    {
      id: 12,
      title: 'Case Study: Large-Scale Implementation Success',
      date: '2024-11-01',
      category: 'Case Study',
      description: 'Detailed case study of a 500-acre farm that reduced fertilizer costs by 35% while improving soil health scores significantly.',
      type: 'news',
      image: 'https://via.placeholder.com/400x250?text=Case+Study'
    }
  ];

  const upcomingEvents = newsItems.filter(item => item.type === 'event');
  const latestNews = newsItems.filter(item => item.type === 'news').slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">News & Events</h1>
          <p className="text-xl text-primary-100">
            Stay updated with the latest news, research, and events in agriculture and fertilizer management
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Upcoming Events Section */}
        <section className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <FaCalendarAlt className="text-2xl text-primary-600" />
            <h2 className="text-3xl font-bold text-gray-800">Upcoming Events</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <div className="h-48 bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center">
                  <FaCalendarAlt className="text-6xl text-white opacity-50" />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-primary-600 mb-2">
                    <FaCalendarAlt />
                    <span className="text-sm font-semibold">{event.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{event.title}</h3>
                  {event.location && (
                    <div className="flex items-center space-x-2 text-gray-600 mb-3">
                      <FaMapMarkerAlt />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  )}
                  <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                  <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {event.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Latest News Section */}
        <section>
          <div className="flex items-center space-x-2 mb-6">
            <FaNewspaper className="text-2xl text-primary-600" />
            <h2 className="text-3xl font-bold text-gray-800">Latest News</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map(news => (
              <div key={news.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <div className="h-40 bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center">
                  <FaFileAlt className="text-4xl text-white opacity-50" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">{news.date}</span>
                    <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold">
                      {news.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-800">{news.title}</h3>
                  <p className="text-gray-600 text-sm">{news.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Resources Section */}
        <section className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <FaFileAlt className="text-4xl text-primary-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Research Papers</h3>
              <p className="text-gray-600 text-sm mb-4">Access latest research on fertilizer optimization</p>
              <button className="text-primary-600 hover:text-primary-700 font-semibold">View Papers →</button>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <FaVideo className="text-4xl text-primary-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Video Tutorials</h3>
              <p className="text-gray-600 text-sm mb-4">Learn from expert-led video tutorials</p>
              <button className="text-primary-600 hover:text-primary-700 font-semibold">Watch Videos →</button>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <FaNewspaper className="text-4xl text-primary-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Newsletter</h3>
              <p className="text-gray-600 text-sm mb-4">Subscribe to our monthly newsletter</p>
              <button className="text-primary-600 hover:text-primary-700 font-semibold">Subscribe →</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewsEvents;
