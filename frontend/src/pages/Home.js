import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { FaLeaf, FaChartLine, FaBrain, FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="min-h-[80vh] flex items-center bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary-400 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-green-400 opacity-10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/20 text-primary-100 border border-primary-400/30 mb-8 backdrop-blur-sm animate-pulse">
            <FaLeaf className="mr-2 text-green-400" />
            <span className="text-sm font-medium tracking-wide uppercase">{t('common.app_name')}</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-primary-100">
              {t('home.hero_title')}
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-12 text-blue-100/90 leading-relaxed font-light px-4">
            {t('home.hero_subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {isAuthenticated ? (
              <Link
                to="/prediction"
                className="group relative bg-white text-primary-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-primary-50 transition duration-300 shadow-2xl hover:shadow-primary-500/20 flex items-center space-x-3 transform hover:-translate-y-1"
              >
                <span>{t('common.go_to_tool')}</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="group relative bg-white text-primary-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-primary-50 transition duration-300 shadow-2xl hover:shadow-primary-500/20 flex items-center space-x-3 transform hover:-translate-y-1"
              >
                <span>{t('common.get_started')}</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>

          {/* Trust badges/minimal info */}
          <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
            <div className="flex items-center space-x-2">
              <FaBrain className="text-2xl" />
              <span className="text-sm font-medium uppercase tracking-widest">{t('home.ai_powered')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaChartLine className="text-2xl" />
              <span className="text-sm font-medium uppercase tracking-widest">{t('home.data_analytics')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaLeaf className="text-2xl" />
              <span className="text-sm font-medium uppercase tracking-widest">{t('home.sustainable')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
