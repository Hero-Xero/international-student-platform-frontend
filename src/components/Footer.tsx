import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.scss';

interface FooterProps {
  darkMode?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const { t } = useTranslation();

  return (
    <footer className={`must-footer ${darkMode ? 'dark' : ''}`}>
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* Column 1: Links */}
          <div className="footer-column">
            <h3 className="footer-title">{t('links')}</h3>
            <ul className="footer-links">
              <li><a href="https://must.edu.eg/undergraduate-admission/" target="_blank" rel="noopener noreferrer">{t('undergraduate')}</a></li>
              <li><a href="https://must.edu.eg/post-graduate-admission/" target="_blank" rel="noopener noreferrer">{t('postgraduate')}</a></li>
              <li><a href="https://must.edu.eg/apply-now/" target="_blank" rel="noopener noreferrer">{t('applyNow')}</a></li>
              <li><a href="https://must.edu.eg/faculties/" target="_blank" rel="noopener noreferrer">{t('facultiesTitle')}</a></li>
              <li><a href="https://must.edu.eg/academic-calendar/" target="_blank" rel="noopener noreferrer">{t('academicCalendarTitle')}</a></li>
            </ul>
          </div>

          {/* Column 2: About University */}
          <div className="footer-column">
            <h3 className="footer-title">{t('aboutUni')}</h3>
            <ul className="footer-links">
              <li><a href="https://must.edu.eg/presidents-office/" target="_blank" rel="noopener noreferrer">{t('president')}</a></li>
              <li><a href="https://must.edu.eg/vice-presidents/" target="_blank" rel="noopener noreferrer">{t('vicePresidents')}</a></li>
              <li><a href="https://must.edu.eg/board-of-trustees/" target="_blank" rel="noopener noreferrer">{t('boardOfTrustees')}</a></li>
              <li><a href="https://must.edu.eg/about-must/vision-mission/" target="_blank" rel="noopener noreferrer">{t('visionMission')}</a></li>
              <li><a href="https://must.edu.eg/about-must/must-policies/" target="_blank" rel="noopener noreferrer">{t('values')}</a></li>
              <li><a href="https://must.edu.eg/history/" target="_blank" rel="noopener noreferrer">{t('history')}</a></li>
            </ul>
          </div>

          {/* Column 3: MUST Buzz */}
          <div className="footer-column">
            <h3 className="footer-title">{t('mustBuzz')}</h3>
            <ul className="footer-links">
              <li><a href="https://must.edu.eg/news/" target="_blank" rel="noopener noreferrer">{t('news')}</a></li>
              <li><a href="https://must.edu.eg/events/" target="_blank" rel="noopener noreferrer">{t('events')}</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="footer-column contact-col">
            <h3 className="footer-title">{t('contactInfo')}</h3>
            <div className="contact-details">
              <p className="address">
                <i className="fas fa-map-marker-alt"></i>
                {t('addressText')}
              </p>
              <p className="phone">
                <i className="fas fa-phone"></i>
                16878
              </p>
              <p className="email">
                <i className="fas fa-envelope"></i>
                info@must.edu.eg
              </p>
              
              <div className="social-links">
                <a href="https://www.facebook.com/mustuni" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                <a href="https://twitter.com/must_uni" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-twitter"></i></a>
                <a href="https://www.instagram.com/must_uni" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-instagram"></i></a>
                <a href="https://www.linkedin.com/school/mustuni/" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
                <a href="https://www.youtube.com/user/mustuniversity" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="bottom-content">
            <p className="copyright">{t('copyright')}</p>
            <div className="bottom-links">
              <a href="https://must.edu.eg/privacy-policy/" target="_blank" rel="noopener noreferrer">{t('policyType')}</a>
              <span className="separator">|</span>
              <a href="https://must.edu.eg/contact/" target="_blank" rel="noopener noreferrer">{t('contactUs')}</a>
            </div>
          </div>
        </div>

      </div>

      {/* Decorative Wave/Pattern */}
      <div className="footer-decoration">
        <div className="wave"></div>
      </div>
    </footer>
  );
};