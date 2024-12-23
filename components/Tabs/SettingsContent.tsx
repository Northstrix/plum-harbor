'use client'
import React, { useState, useEffect } from 'react';
import { IconSettings, IconChevronDown } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { db, auth } from '@/app/lib/firebase';
import { doc, setDoc, collection } from "firebase/firestore";
import Swal from 'sweetalert2';
import useStore from '@/store/store';

// Import the languages from a separate file
import { languages } from '@/app/lib/language';

const SettingsContent: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [cornerRounding, setCornerRounding] = useState<string>('Smooth');
  const { cornerRounding: zstndcornerRounding } = useStore();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCornerRoundingOpen, setIsCornerRoundingOpen] = useState(false);

  const isRTL = i18n.language === 'he';

  useEffect(() => {
    setCornerRounding(zstndcornerRounding);
    if (zstndcornerRounding === 'Smooth') {
      applyCornerRounding(smoothCornerRoundingOptions);
    } else {
      applyCornerRounding(verySmoothCornerRoundingOptions);
    }
  }, [zstndcornerRounding]);

  interface CornerRoundingOptions {
    generalBorderRadius: string;
    FileContainerRounding: string;
  }

  const verySmoothCornerRoundingOptions: CornerRoundingOptions = {
    generalBorderRadius: '1.76em',
    FileContainerRounding: '2.25em'
  };

  const smoothCornerRoundingOptions: CornerRoundingOptions = {
    generalBorderRadius: '0.76em',
    FileContainerRounding: '1.76em'
  };

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setIsLanguageOpen(false);
  };

  const handleCornerRoundingChange = (value: string) => {
    setCornerRounding(value);
    if (value === 'Smooth') {
      applyCornerRounding(smoothCornerRoundingOptions);
    } else {
      applyCornerRounding(verySmoothCornerRoundingOptions);
    }
    setIsCornerRoundingOpen(false);
  };

  const applyCornerRounding = (options: CornerRoundingOptions) => {
    Object.entries(options).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  };

  const handleApply = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        Swal.fire({
          title: t('saving-settings'),
          html: `<p dir="${isRTL ? 'rtl' : 'ltr'}">${t('please_wait')}</p>`,
          color: "var(--foreground)",
          background: "var(--background)",
          width: 640,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
        const userSettings = {
          language: i18n.language,
          cornerRounding
        };
        const docRef = doc(collection(db, 'data'), `${user.email}/private/settings`);
        await setDoc(docRef, userSettings);
        await new Promise(resolve => setTimeout(resolve, 75));
        Swal.fire({
          icon: "success",
          title: t('settings-saved-successfully-top'), // Adjust translation key as needed
          width: 600,
          padding: "3em",
          color: "var(--foreground)",
          background: "var(--background)",
          confirmButtonText: t('ok_button'),
          confirmButtonColor: "var(--firstThemeColor)"
        });
      } else {
        console.error("Authentication Error");
        const warningMessage = `
        <p style="margin-bottom: 10px;" dir="${isRTL ? 'rtl' : 'ltr'}">${t('authentication-error-line1')}</p>
        <p style="margin-bottom: 10px;" dir="${isRTL ? 'rtl' : 'ltr'}">${t('authentication-error-line2')}</p>
      `;
      
      Swal.fire({
        icon: "error",
        title: t('authentication-error-top'),
        html: warningMessage, // Use the formatted warning message
        width: i18n.language === 'he' ? 600 : 720,
        padding: "3em",
        color: "var(--foreground)",
        background: "var(--background)",
        confirmButtonText: t('ok_button'),
        confirmButtonColor: "var(--firstThemeColor)"
      });
      }
    } catch (err) {
      console.error("Error saving the settings:", (err as Error).message);

      const warningMessage = `
          <p style="margin-bottom: 10px;" dir="${isRTL ? 'rtl' : 'ltr'}">${t('failed-to-save-settings')}</p>
          <p style="margin-bottom: 10px;" dir="${isRTL ? 'rtl' : 'ltr'}">${t('something_went_wrong_line1')}</p>
          <p style="margin-bottom: 10px;" dir="${isRTL ? 'rtl' : 'ltr'}">${t('check_the_console')}</p>
      `;
      
      Swal.fire({
          icon: "error",
          title: t('error'),
          html: warningMessage, // Use the formatted warning message
          width: 600,
          padding: "3em",
          color: "var(--foreground)",
          background: "var(--background)",
          confirmButtonText: t('ok_button'),
          confirmButtonColor: "var(--firstThemeColor)"
      });
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'transparent',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--foreground)',
          borderRadius: 'var(--generalBorderRadius)',
          padding: '20px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          width: '424px',
          display: 'flex',
          flexDirection: 'column',
          transform: isRTL ? 'scaleX(-1)' : 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <IconSettings size={48} style={{ color: 'var(--background)' }} />
          <h1
            style={{
              color: 'var(--background)',
              marginLeft: '10px',
              fontSize: '24px',
              fontWeight: 'bold',
              transform: isRTL ? 'scaleX(-1)' : 'none',
            }}
          >
            {t('settings-tab')}
          </h1>
        </div>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
          }}
        >
          {/* Language Dropdown */}
          <div style={{ marginBottom: '15px', width: '100%', position: 'relative' }}>
            <div
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                backgroundColor: 'var(--fileContainerBackground)',
                borderRadius: 'var(--generalBorderRadius)',
                cursor: 'pointer',
              }}
            >
              <span style={{ color: 'var(--foreground)', transform: isRTL ? 'scaleX(-1)' : 'none' }}>{t('word-for-language')}</span>
              <IconChevronDown size={24} style={{ color: 'var(--foreground)' }} />
            </div>
            {isLanguageOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  backgroundColor: 'var(--background)',
                  borderRadius: 'var(--generalBorderRadius)',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  zIndex: 10,
                  marginTop: '5px',
                  border: `3px solid var(--hoverBackgroundColor)`,
                  transform: isRTL ? 'scaleX(-1)' : 'none',
                }}
              >
              {languages.map((lang, index) => (
                <React.Fragment key={lang.code}>
                  <div
                    onClick={() => handleLanguageChange(lang.code)}
                    style={{
                      padding: '10px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      color: 'var(--foreground)', // All items have the same text color
                      backgroundColor: i18n.language === lang.code ? 'var(--fileContainerBackground)' : 'var(--background)', // Darkened background for the current language
                      transition: 'background-color 0.3s ease', // Smooth transition for hover effect
                      borderRadius: 'var(--generalBorderRadius)',
                    }}
                    onMouseEnter={(e) => {
                      if (i18n.language !== lang.code) {
                        e.currentTarget.style.backgroundColor = 'var(--hoverBackgroundColor)'; // Lightened background on hover
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (i18n.language !== lang.code) {
                        e.currentTarget.style.backgroundColor = 'var(--background)'; // Reset background when not hovered
                      }
                    }}
                  >
                    <img
                      src={lang.flag}
                      alt={lang.name}
                      style={{
                        width: '20px',
                        marginRight: '10px',
                        marginLeft: '10px',
                      }}
                    />
                    <span>{lang.name}</span>
                  </div>
                  {index !== languages.length - 1 && (
                    <div
                      style={{
                        height: '1px',
                        backgroundColor: `var(--separatorColor)`,
                        marginLeft: '3%',
                        marginRight: '3%',
                      }}
                    ></div>
                  )}
                </React.Fragment>
              ))}

              </div>
            )}
          </div>
          {/* Corner Rounding Dropdown */}
          <div style={{ marginBottom: '15px', width: '100%', position: 'relative' }}>
            <div
              onClick={() => setIsCornerRoundingOpen(!isCornerRoundingOpen)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                backgroundColor: 'var(--fileContainerBackground)',
                borderRadius: 'var(--generalBorderRadius)',
                cursor: 'pointer',
              }}
            >
              <span style={{ color: 'var(--foreground)', transform: isRTL ? 'scaleX(-1)' : 'none' }}>{t('word-for-cornerRounding')}</span>
              <IconChevronDown size={24} style={{ color: 'var(--foreground)' }} />
            </div>
            {isCornerRoundingOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  backgroundColor: 'var(--background)',
                  borderRadius: 'var(--generalBorderRadius)',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  zIndex: 10,
                  marginTop: '5px',
                  border: `3px solid var(--hoverBackgroundColor)`,
                  transform: isRTL ? 'scaleX(-1)' : 'none',
                }}
              >
                {['Smooth', 'Very smooth'].map((option, index) => (
                  <React.Fragment key={option}>
                    <div
                      onClick={() => handleCornerRoundingChange(option)}
                      style={{
                        padding: '10px',
                        cursor: 'pointer',
                        color: 'var(--foreground)', // All items have the same text color
                        backgroundColor:
                          cornerRounding === option ? 'var(--fileContainerBackground)' : 'var(--background)', // Highlight selected option
                        transition: 'background-color 0.3s ease', // Smooth transition for hover effect
                        borderRadius: index === 0 ? 'var(--generalBorderRadius) var(--generalBorderRadius) 0 0' : undefined, // Rounded corners for the first item
                      }}
                      onMouseEnter={(e) => {
                        if (cornerRounding !== option) {
                          e.currentTarget.style.backgroundColor = 'var(--hoverBackgroundColor)'; // Lightened background on hover
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (cornerRounding !== option) {
                          e.currentTarget.style.backgroundColor = 'var(--background)'; // Reset background when not hovered
                        }
                      }}
                    >
                      {t(`cornerRounding${index + 1}`)} {/* Logical translation keys */}
                    </div>
                    {index !== 1 && (
                      <div
                        style={{
                          height: '1px',
                          backgroundColor: `var(--separatorColor)`,
                          marginLeft: '3%',
                          marginRight: '3%',
                        }}
                      ></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          {/* Apply Button */}
          <button
            type="button"
            onClick={handleApply}
            style={{
              padding:'10px 20px',
              backgroundColor:'var(--middleThemeColor)',
              color:'var(--foreground)',
              border:'none',
              borderRadius:'var(--generalBorderRadius)',
              cursor:'pointer',
              transition:'background-color 0.3s ease',
              alignSelf:"center",
              marginTop:'10px',
              transform: isRTL ? 'scaleX(-1)' : 'none',
            }}
          >
            {t('save-settings')}
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default SettingsContent;
