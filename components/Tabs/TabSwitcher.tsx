'use client';

import React, { useState, useEffect } from 'react';
import ChronicleButton from '@/components/ui/ChronicleButton/ChronicleButton'; // Import your logout button component
import Link from 'next/link'; // Import Link for navigation
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook and i18n
import ProfileContent from '@/components/Tabs/ProfileContent';
import PersonalFilesContent from '@/components/Tabs/PersonalFilesContent';
import SharedFilesContent from '@/components/Tabs/SharedFilesContent';
import ReceivedFilesContent from '@/components/Tabs/ReceivedFilesContent';
import SentFilesContent from '@/components/Tabs/SentFilesContent';
import PasswordVaultContent from '@/components/Tabs/PasswordVaultContent';
import SettingsContent from '@/components/Tabs/SettingsContent';
import AboutContent from '@/components/Tabs/AboutContent';
import useStore from '@/store/store';
import { auth } from '@/app/lib/firebase';

import { IconUserFilled, IconFolderFilled, IconFileFilled, IconCircleArrowDownFilled, IconCircleArrowUpFilled, IconLockFilled, IconSettingsFilled, IconInfoCircleFilled } from '@tabler/icons-react';
import FancyNavBar from '@/components/ui/FancyNavbar'

// Square component for logo
const Square: React.FC<{ color: string }> = ({ color }) => (
  <div style={{
    width: '12px',
    height: '12px',
    backgroundColor: color,
    margin: '2px',
    borderRadius: '50%',
  }} />
);

const TabSwitcher: React.FC<{ windowWidth: number; }> = ({  }) => {
  const [activeTab, setActiveTab] = useState(2);
  const { i18n, t } = useTranslation();
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [showConfirmPopUp, setShowConfirmPopUp] = useState(false);
  const { setIsLoggedIn, setMasterKey, setUsername, setIterations } = useStore.getState();
  const isRTL = i18n.language === 'he';
  
  const tabs = [
    { label: 'Profile', component: <ProfileContent /> },
    { label: 'Personal Files', component: <PersonalFilesContent /> },
    { label: 'Shared Files', component: <SharedFilesContent /> },
    { label: 'Received Files', component: <ReceivedFilesContent /> },
    { label: 'Sent Files', component: <SentFilesContent /> },
    { label: 'Password Vault', component: <PasswordVaultContent /> },
    { label: 'Settings', component: <SettingsContent /> },
    { label: 'About', component: <AboutContent /> },
  ];

  useEffect(() => {
    // Set initial window width
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for resize
    window.addEventListener('resize', handleResize);
    
    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCancelLogOut = () => {
    setShowConfirmPopUp(false);
  };

  const handleLogOut = () => {
    setMasterKey(new Uint8Array(272).fill(Math.floor(Math.random() * 256))); // Fill with random bytes
    setUsername(`user_${Math.random().toString(36).substring(2, 15)}`); // Random username
    setIterations(Math.floor(Math.random() * 100)); // Random iterations
    setShowConfirmPopUp(false);
    auth.signOut();
    setIsLoggedIn(false);
  };
 
  const handleLogOutConfirmation = () => {
    setShowConfirmPopUp(true);
  };

  return (
    <>
    {/* Confirmation Pop-Up */}

    {showConfirmPopUp && (
      <div 
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.1rem 2rem',
          border: '3px solid var(--secondThemeColor)',
          borderRadius: 'var(--generalBorderRadius)',
          color: 'black',
          zIndex: 100001,
          fontFamily: '"Questrial", sans-serif',
          backgroundColor: 'var(--logoutModalSecondColor)',
          backgroundImage: `
            linear-gradient(45deg, var(--logoutModalFirstColor) 25%, transparent 25%, transparent 75%, var(--logoutModalFirstColor) 75%, var(--logoutModalFirstColor)),
            linear-gradient(-45deg, var(--logoutModalFirstColor) 25%, transparent 25%, transparent 75%, var(--logoutModalFirstColor) 75%, var(--logoutModalFirstColor))
          `,
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0',
          animation: 'slide 4s infinite linear',
          textAlign: 'center',
        }}
      >
        <div 
          style={{
            padding: '12px', // Padding for the semi-transparent container
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
            borderRadius: 'var(--generalBorderRadius)', // Match border radius
            width: '100%', // Optional to make it full width within the pop-up
            background: 'rgba(26, 32, 48, 0.7)',
            backdropFilter: 'blur(10px) saturate(90%)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
          }}
        >
          <p className="encrypted-space-confirm-pop-up-message" dir={isRTL ? 'rtl' : 'ltr'}>{t('are-you-sure-you-want-to-log-out?')}</p>
        </div>
        <div className="encrypted-space-confirm-pop-up-options" style={{ marginTop: '20px' }}> {/* Added margin-top here */}
        { i18n.language === 'he' ? (
          <>
            <button className={`encrypted-space-confirm-pop-up-btn ${isRTL ? 'rtl' : 'ltr'}`} onClick={handleCancelLogOut}>
              {t('no')}
            </button>
            <button className={`encrypted-space-confirm-pop-up-btn ${isRTL ? 'rtl' : 'ltr'}`} onClick={handleLogOut}>
              {t('yes')}
            </button>
          </>
        ) : (
          <>
            <button className={`encrypted-space-confirm-pop-up-btn ${isRTL ? 'rtl' : 'ltr'}`} onClick={handleLogOut}>
              {t('yes')}
            </button>
            <button className={`encrypted-space-confirm-pop-up-btn ${isRTL ? 'rtl' : 'ltr'}`} onClick={handleCancelLogOut}>
              {t('no')}
            </button>
          </>
        )}
        </div>
      </div>
    )}
    <style jsx>{`
      .encrypted-space-pop-up-form-buttons {
        display: flex;
        justify-content: space-between;
        margin-top: auto;
      }

      @keyframes slide {
        from { background-position: 0 0; }
        to { background-position: -120px 60px; }
      }

      .encrypted-space-confirm-pop-up-message {
        font-size: 21px;
        color: var(--notificationForeground);
        text-align: center; /* Center text */
      }

      .encrypted-space-confirm-pop-up-btn {
        color: inherit;
        font-family: inherit;
        font-size: inherit;
        background-color:white;
        width: 70px;
        padding: 10px; /* Adjusted padding */
        border-radius: 4px; /* Rounded corners */
        border:none; /* No border */
        margin-right:.5rem; /* Space between buttons */
        box-shadow:.2rem .2rem .5rem rgba(0,0,0,.2); /* Shadow effect */
        transition:.2s; /* Smooth transition */
      }

      .encrypted-space-confirm-pop-up-btn:hover {
          box-shadow: .4rem .4rem .5rem rgba(0, 0, 0, .3); /* Darker shadow on hover */
      }

      .encrypted-space-confirm-pop-up-btn:hover.ltr {
          transform: translate(.2rem, -.2rem); /* Move slightly up for LTR */
      }

      .encrypted-space-confirm-pop-up-btn:hover.rtl {
          transform: translate(-.2rem, -.2rem); /* Move slightly up for RTL */
      }

      .encrypted-space-confirm-pop-up-options {
        display:flex; /* Flexbox for button alignment */
        flex-direction:row; /* Horizontal layout */
        justify-content:center; /* Center buttons */
      }
    `}</style>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '72px',
        backgroundColor: 'var(--navbarBackgroundWhenLoggedIn)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        zIndex: 10000,
        transform: i18n.language === 'he' ? 'scaleX(-1)' : 'none', // Mirror navbar if Hebrew
      }}>
        <div style={{
          width: '84%', 
          marginLeft: 'auto',
          justifyContent: 'space-between',
          marginRight: 'auto', 
          display:'flex', 
          alignItems:'center',
        }}>
          {/* Logo */}
          <Link href="/" onClick={() => setActiveTab(1)} style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color:'#FFFFFF',
            zIndex:'1',
          }}>
            <div style={{
              display:'grid',
              gridTemplateColumns:'repeat(3, 1fr)',
              gridTemplateRows:'repeat(3, 1fr)',
              width:'44px',
              height:'44px',
              marginRight:i18n.language === 'he' ? '5px' : '8px',
              marginLeft:i18n.language === 'he' ? '12px' : '8px',
              transform: i18n.language === 'he' ? 'scaleX(-1)' : 'none', // Mirror navbar if Hebrew
            }}>
              <Square color="var(--middleLogoColor)" />
              <Square color="var(--secondLogoColor)" />
              <Square color="var(--firstLogoColor)" />
              <Square color="var(--middleLogoColor)" />
              <Square color="var(--middleLogoColor)" />
              <Square color="var(--firstLogoColor)" />
              <Square color="var(--middleLogoColor)" />
              <Square color="#00000000" />
              <Square color="var(--firstLogoColor)" />
            </div>
            {(windowWidth >= 1080) && (
              <span style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginLeft: '8px',
                color: 'var(--foreground)',
                transition:'color .4s linear', 
                transform: i18n.language === 'he' ? 'scaleX(-1)' : 'none', // Mirror navbar if Hebrew
              }}>
                {t('plum-harbor')} 
              </span>
            )}
          </Link>

          {/* Tabs in the center */}
          <ul style={{
            display: 'flex',
            flexGrow: '1',
            justifyContent: 'center',
            alignItems: 'center', // This centers the content vertically
            listStyleType: 'none',
            marginLeft: '20px',
            marginRight: '20px',
            paddingLeft: '0',
            height: '72px', // This ensures the ul takes the full viewport height
            position: 'fixed', // This positions the ul relative to the viewport
            left: '0',
            right: '0',
            top: '0',
            bottom: '0',
          }}>
            <FancyNavBar
              items={[
                { icon: <IconUserFilled size={24} />, label: t('profile-info-tab')},
                { icon: <IconFolderFilled size={24} />, label: t('personal-files-tab')},
                { icon: <IconFileFilled size={24} />, label: t('shared-files-tab') },
                { icon: <IconCircleArrowDownFilled size={24} />, label: t('received-files-tab') },
                { icon: <IconCircleArrowUpFilled size={24} />, label: t('sent-files-tab') },
                { icon: <IconLockFilled size={24} />, label: t('password-vault-tab') },
                { icon: <IconSettingsFilled size={24} />, label: t('settings-tab') },
                { icon: <IconInfoCircleFilled size={24} />, label: t('about-tab') },
              ]}
              onItemClick={(index) => setActiveTab(index)}
              backgroundColor='var(--navbarBackgroundWhenLoggedIn)'
              foregroundColor='var(--foreground)'
              defaultItem={activeTab}
            />
          </ul>
          

          <div style={{ 
            backgroundColor: "transparent", 
            paddingLeft: "10px", 
            paddingRight: "10px", 
            transform: i18n.language === 'he' ? 'scaleX(-1)' : 'none' 
          }}>
            <ChronicleButton 
              text={t('log-out-the-verb')} 
              width={
                i18n.language === 'he' ? '100px' : 
                i18n.language === 'en' ? '112px' : 
                i18n.language === 'es' ? '200px' : 
                '136px' // default width if none of the above languages
              } 
              outlined={true} 
              outlinePaddingAdjustment="4px" 
              onClick={handleLogOutConfirmation}
            />
          </div>

        </div>
      </nav>

      <div style={{
        border: '12px solid var(--navbarBackgroundWhenLoggedIn)',
        width: '100%',
        height: 'calc(100vh - 60px)',
        backgroundColor: 'var(--navbarBackgroundWhenLoggedIn)',
      }}>
        <div style={{
          backgroundColor: 'var(--background)', // Or your desired background color
          borderRadius: 'calc(var(--mainWindowRounding) - 12px)',
          height: '100%'
        }}>
        {tabs.map((tab, index) => (
          <div key={index} style={{
            display: (activeTab === index) ? "block" : "none",
            height: '100%',
            width: '100%', // Ensure it takes full width
            overflowY: (index === 1 || index === 2 || index === 3 || index === 4) ? 'auto' : 'visible', // Enable scrolling for specific tabs
            padding: (index === 1 || index === 2 || index === 3 || index === 4) ? '20px' : '0', // Add padding for specific tabs
          }}>
            {tab.component}
          </div>
        ))}
      </div>
      </div>
    </>
  );
};

export default TabSwitcher;