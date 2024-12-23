'use client';

import React, { useState, useEffect } from 'react';
import ChronicleButton from '@/components/ui/ChronicleButton/ChronicleButton';
import Link from 'next/link'; 
import { useTranslation } from 'react-i18next';
import FancyNavBar from '@/components/ui/FancyNavbar'
import "@fontsource/roboto-mono/700.css";
import LanguageSelector from "@/components/ui/LanguageSelector"

interface SquareProps {
  color: string;
}

const Square: React.FC<SquareProps> = ({ color }) => (
  <div style={{
    width: '12px',
    height: '12px',
    backgroundColor: color,
    margin: '2px',
    borderRadius: '50%',
  }} />
);

interface NavigationBarProps {
  setShowLogin: (show: boolean) => void; // Function to control login visibility
  setIsRegistering: (isRegistering: boolean) => void; // Function to control registration visibility
  setShowHome: () => void; // Function to show home page
}

const NavigationBar: React.FC<NavigationBarProps> = ({ setShowLogin, setIsRegistering, setShowHome }) => {
  const [opacity, setOpacity] = useState(0);
  const [language, setLanguage] = useState('en'); 
  const [appName, setAppName] = useState('Plum Harbor');
  const { i18n, t } = useTranslation();
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);

  // State to track window width
  const [windowWidth, setWindowWidth] = useState(0); // Initialize with a default value

  interface LanguageIconProps {
    width?: number;
    height?: string | number;
    color?: string;
    language: string;
  }
  
  const LanguageIcon: React.FC<LanguageIconProps> = ({ 
    width = 24, 
    height = 'auto', 
    color = 'currentColor',
    language
  }) => {
    return (
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 30 30" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <text 
          x="50%" 
          y="50%" 
          dominantBaseline="middle" 
          textAnchor="middle" 
          fontFamily="Arial, Alef, sans-serif" 
          fontSize="14" 
          fill={color}
        >A | א</text>
      </svg>
    );
  };  
  
  // Launch fade-in effect
  useEffect(() => {
    const showDelay = setTimeout(() => {
      const fadeIn = setInterval(() => {
        setOpacity((prevOpacity) => {
          if (prevOpacity >= 1) {
            clearInterval(fadeIn);
            return 1;
          }
          return prevOpacity + 0.02;
        });
      }, 30); 

      return () => clearInterval(fadeIn);
    }, 2000);

    return () => clearTimeout(showDelay);
  }, []);

  // Effect to handle window resizing
  useEffect(() => {
    // Set initial width on mount
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize(); // Set initial width

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '72px',
      backgroundColor: 'var(--navbarBackgroundWhenNotLoggedIn)',
      zIndex: 1000,
      opacity: opacity,
      transition: 'opacity 0.5s linear', // Smooth transition for opacity
      transform: i18n.language === 'he' ? 'scaleX(-1)' : 'none',
    }}>
      <div style={{
        maxWidth: '1336px',
        height: '100%',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between', // Always space between items
        alignItems: 'center',
      }}>
        <Link href="/" onClick={setShowHome} style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color:'#FFFFFF',
            zIndex: '1',
          }}>
            <div style={{
              display:'grid',
              gridTemplateColumns:'repeat(3, 1fr)',
              gridTemplateRows:'repeat(3, 1fr)',
              width:'44px',
              height:'44px',
              marginRight:i18n.language === 'he' ? '5px' : '8px',
              marginLeft:i18n.language === 'he' ? '12px' : '8px',
              transform: i18n.language === 'he' ? 'scaleX(-1)' : 'none',
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
        
        {/* Language Switcher and Login Button */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
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
                { icon: <LanguageIcon width={26} height="auto" language={i18n.language} />, 
                label: "Language"
              },
              ]}
              height={60}
              padding={5}
              foregroundColor='var(--foreground)'
              backgroundColor="var(--navbarBackgroundWhenNotLoggedIn)"
              onItemClick={(index) => setIsLanguageSelectorOpen(true)}
            />
          </ul>
          </div>
          
          {/* Login Button */}
          <div style={{ 
            backgroundColor: "transparent", 
            paddingLeft: "10px", 
            paddingRight: "10px", 
            transform: i18n.language === 'he' ? 'scaleX(-1)' : 'none',
          }}>
            <ChronicleButton 
              text={t('log-in-the-verb')} 
              width={
                i18n.language === 'he' ? '100px' : 
                i18n.language === 'en' ? '112px' : 
                i18n.language === 'es' ? '200px' : 
                '136px' // default width if none of the above languages
              } 
              outlined={true} 
              outlinePaddingAdjustment="4px" 
              onClick={() => {
                setIsRegistering(false);
                setShowLogin(true);
              }} 
            />
          </div>

        </div>
    </nav>
          <LanguageSelector
          isOpen={isLanguageSelectorOpen}
          onClose={() => setIsLanguageSelectorOpen(false)}
        />
    </>
  );
};

export default NavigationBar;