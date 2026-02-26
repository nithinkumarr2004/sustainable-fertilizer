import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { FaBars, FaTimes, FaHome, FaLeaf, FaNewspaper, FaCalculator, FaUser, FaSignOutAlt, FaGlobe } from 'react-icons/fa';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center space-x-2 text-primary-600 font-bold text-xl">
              <FaLeaf className="text-2xl" />
              <span>{t('common.app_name')}</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100 flex items-center space-x-1"
                >
                  <FaHome />
                  <span>{t('common.home') || 'Home'}</span>
                </Link>
                <Link
                  to="/about"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100 flex items-center space-x-1"
                >
                  <FaLeaf />
                  <span>{t('common.about')}</span>
                </Link>
                <Link
                  to="/news-events"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100 flex items-center space-x-1"
                >
                  <FaNewspaper />
                  <span>{t('common.news_events')}</span>
                </Link>
                <Link
                  to="/prediction"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100 flex items-center space-x-1"
                >
                  <FaCalculator />
                  <span>{t('common.prediction_tool')}</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100 flex items-center space-x-1"
                >
                  <FaUser />
                  <span>{t('common.dashboard')}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center space-x-1"
                >
                  <FaSignOutAlt />
                  <span>{t('common.logout') || 'Logout'}</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition duration-200"
                >
                  {t('common.login') || 'Login'}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition duration-200 shadow-md hover:shadow-lg"
                >
                  {t('common.signup') || 'Sign Up'}
                </Link>
              </>
            )}

            {/* Language Switcher */}
            <div className={`flex items-center ml-4 pl-4 border-l border-gray-200`}>
              <FaGlobe className="text-gray-400 mr-2" />
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                value={i18n.language}
                className="bg-transparent text-sm font-semibold text-gray-700 focus:outline-none cursor-pointer hover:text-primary-600 transition duration-200"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="ta">தமிழ் (Tamil)</option>
              </select>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {isAuthenticated ? (
              <>
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100"
                >
                  {t('common.home') || 'Home'}
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100"
                >
                  {t('common.about')}
                </Link>
                <Link
                  to="/news-events"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100"
                >
                  {t('common.news_events')}
                </Link>
                <Link
                  to="/prediction"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100"
                >
                  {t('common.prediction_tool')}
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100"
                >
                  {t('common.dashboard')}
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  {t('common.logout') || 'Logout'}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100"
                >
                  {t('common.login') || 'Login'}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 mt-2"
                >
                  {t('common.signup') || 'Sign Up'}
                </Link>
              </>
            )}

            {/* Mobile Language Switcher */}
            <div className="px-3 py-4 border-t mt-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t('common.language')}</p>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => { changeLanguage('en'); setMobileMenuOpen(false); }} className={`px-2 py-2 text-sm rounded-md border ${i18n.language === 'en' ? 'bg-primary-50 border-primary-600 text-primary-600' : 'border-gray-200 text-gray-700'}`}>English</button>
                <button onClick={() => { changeLanguage('hi'); setMobileMenuOpen(false); }} className={`px-2 py-2 text-sm rounded-md border ${i18n.language === 'hi' ? 'bg-primary-50 border-primary-600 text-primary-600' : 'border-gray-200 text-gray-700'}`}>हिंदी</button>
                <button onClick={() => { changeLanguage('kn'); setMobileMenuOpen(false); }} className={`px-2 py-2 text-sm rounded-md border ${i18n.language === 'kn' ? 'bg-primary-50 border-primary-600 text-primary-600' : 'border-gray-200 text-gray-700'}`}>ಕನ್ನಡ</button>
                <button onClick={() => { changeLanguage('te'); setMobileMenuOpen(false); }} className={`px-2 py-2 text-sm rounded-md border ${i18n.language === 'te' ? 'bg-primary-50 border-primary-600 text-primary-600' : 'border-gray-200 text-gray-700'}`}>తెలుగు</button>
                <button onClick={() => { changeLanguage('ta'); setMobileMenuOpen(false); }} className={`px-2 py-2 text-sm rounded-md border ${i18n.language === 'ta' ? 'bg-primary-50 border-primary-600 text-primary-600' : 'border-gray-200 text-gray-700'}`}>தமிழ்</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
