import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { FaLeaf, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isMinimalFooter = (isHomePage || isAuthPage) && !isAuthenticated;

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className={`${isMinimalFooter ? 'md:col-span-2' : ''}`}>
            <div className="flex items-center space-x-2 mb-4">
              <FaLeaf className="text-2xl text-primary-400" />
              <span className="font-bold text-xl">{t('common.app_name')}</span>
            </div>
            <p className="text-gray-400 max-w-sm">
              {t('footer.tagline')}
            </p>
          </div>

          {!isMinimalFooter && (
            <>
              <div>
                <h3 className="font-semibold mb-4">{t('footer.quick_links')}</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/" className="hover:text-white transition-colors">{t('common.home')}</Link></li>
                  <li><Link to="/about" className="hover:text-white transition-colors">{t('footer.about_link')}</Link></li>
                  <li><Link to="/news-events" className="hover:text-white transition-colors">{t('common.news_events')}</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">{t('footer.account')}</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/dashboard" className="hover:text-white transition-colors">{t('common.dashboard')}</Link></li>
                  <li><Link to="/prediction" className="hover:text-white transition-colors">{t('common.prediction_tool')}</Link></li>
                  <li><Link to="/history" className="hover:text-white transition-colors">{t('common.history')}</Link></li>
                </ul>
              </div>
            </>
          )}

          <div className={`${isMinimalFooter ? 'md:col-span-2' : ''}`}>
            <h3 className="font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start space-x-3">
                <FaEnvelope className="text-primary-400 mt-1" />
                <span>info@smartfertilizer.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <FaPhone className="text-primary-400 mt-1" />
                <span>+91 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary-400 mt-1" />
                <span>{t('footer.address')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} {t('common.app_name')}. {t('footer.all_rights')}</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
