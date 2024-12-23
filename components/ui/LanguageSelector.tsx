import React from 'react';
import { useTranslation } from 'react-i18next';
import ChronicleButton from '@/components/ui/ChronicleButton/ChronicleButton';

interface LanguageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

import { languages } from '@/app/lib/language';

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();

  if (!isOpen) return null;

  const handleLanguageSelect = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      overflowY: 'auto',
    }}>
      <div style={{
        backgroundColor: 'var(--background)',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '402px',
        width: '100%',
        color: '#f7f7ff',
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '20px', 
          fontSize: '32px',
          fontWeight: 'bold'
        }}>
          Language
        </h2>
        {languages.map((lang) => (
          <div key={lang.code} style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1px',  // Increased margin
            cursor: 'pointer',
            backgroundColor: i18n.language === lang.code ? 'var(--navbarBackgroundWhenNotLoggedIn)' : 'transparent',
            padding: '20px',  // Increased padding
            borderRadius: '15px',
            transform: lang.code === 'he' ? 'scaleX(-1)' : 'none',
          }} onClick={() => handleLanguageSelect(lang.code)}>
            <img 
              src={lang.flag} 
              alt={lang.name} 
              width={123} 
              height="auto" 
              style={{ 
                marginRight: '10px', 
                borderRadius: '5px',
                transform: lang.code === 'he' ? 'scaleX(-1)' : 'none',
              }} 
            />
            <span style={{
              transform: lang.code === 'he' ? 'scaleX(-1)' : 'none',
              wordBreak: 'keep-all',
              whiteSpace: 'normal',
              fontSize: 'clamp(16px, 3vw, 20px)',
              lineHeight: '1.2',
            }}>{lang.name}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <ChronicleButton 
            text={t('ok_button')} 
            width="160px"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
