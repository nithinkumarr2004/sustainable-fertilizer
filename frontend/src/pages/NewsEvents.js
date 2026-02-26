import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaCalendarAlt, FaMapMarkerAlt, FaNewspaper, FaVideo, FaFileAlt } from 'react-icons/fa';

const NewsEvents = () => {
  const { t } = useTranslation();

  // In a real app, these would come from an API. 
  // For the purpose of "whole page" translation, we use keys.
  const newsItems = [
    {
      id: 1,
      title: t('news.item1_title'),
      date: '2024-11-15',
      category: t('news.cat_tech'),
      description: t('news.item1_desc'),
      type: 'news',
      image: 'https://via.placeholder.com/400x250?text=AI+Model'
    },
    {
      id: 2,
      title: t('news.item2_title'),
      date: '2024-11-20',
      category: t('news.cat_event'),
      description: t('news.item2_desc'),
      type: 'event',
      location: t('news.item2_loc'),
      image: 'https://via.placeholder.com/400x250?text=Workshop'
    },
    {
      id: 3,
      title: t('news.item3_title'),
      date: '2024-11-10',
      category: t('news.cat_success'),
      description: t('news.item3_desc'),
      type: 'news',
      image: 'https://via.placeholder.com/400x250?text=Success'
    }
  ];

  const upcomingEvents = newsItems.filter(item => item.type === 'event');
  const latestNews = newsItems.filter(item => item.type === 'news').slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">{t('news.title')}</h1>
          <p className="text-xl text-primary-100">
            {t('news.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Upcoming Events Section */}
        <section className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <FaCalendarAlt className="text-2xl text-primary-600" />
            <h2 className="text-3xl font-bold text-gray-800">{t('news.upcoming_events')}</h2>
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
            <h2 className="text-3xl font-bold text-gray-800">{t('news.latest_news')}</h2>
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
          <h2 className="text-2xl font-bold mb-6 text-gray-800">{t('news.resources')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <FaFileAlt className="text-4xl text-primary-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">{t('news.research_papers')}</h3>
              <p className="text-gray-600 text-sm mb-4">{t('news.research_desc')}</p>
              <button className="text-primary-600 hover:text-primary-700 font-semibold">{t('news.view_papers')} →</button>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <FaVideo className="text-4xl text-primary-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">{t('news.video_tutorials')}</h3>
              <p className="text-gray-600 text-sm mb-4">{t('news.video_desc')}</p>
              <button className="text-primary-600 hover:text-primary-700 font-semibold">{t('news.watch_videos')} →</button>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <FaNewspaper className="text-4xl text-primary-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">{t('news.newsletter')}</h3>
              <p className="text-gray-600 text-sm mb-4">{t('news.newsletter_desc')}</p>
              <button className="text-primary-600 hover:text-primary-700 font-semibold">{t('news.subscribe')} →</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewsEvents;
