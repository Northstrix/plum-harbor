"use client"
import React, { useEffect, useRef } from 'react';
import styles from './BauhausFileCard.module.css';
import ChronicleButton from '@/components/ui/ChronicleButton/ChronicleButton';
import "@fontsource/roboto-mono/700.css";
import { useTranslation } from 'react-i18next';

interface BauhausFileCard {
    id: string;
    borderRadius?: string;
    backgroundColor?: string; // Background color for the card
    separatorColor?: string; // Color for the internal separator line
    accentColor: string; // New prop for accent color
    borderWidth?: string; // New prop for border width
    topInscription: string;
    fileName: string;
    subMainText: string;
    filledButtonInscription?: string; // New property for filled button inscription
    outlinedButtonInscription?: string; // New property for outlined button inscription
    onFilledButtonClick: (id: string) => void; // Renamed from onGetTag
    onOutlinedButtonClick: (id: string) => void; // Renamed from onShowAllOptions
    onTitleClick: (id: string) => void;
    onDescriptionClick: (id: string) => void;
    metadataIntegrity?: boolean;
    filledChronicleButtonHoverColor?: string;
    oulinedChronicleButtonHoverColor?: string;
}

// Utility function to determine if text is RTL
const isRTLCheck = (text: string): boolean => {
    return /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F]/.test(text); // Hebrew, Arabic, and Persian ranges in Unicode
};

const BauhausFileCard: React.FC<BauhausFileCard> = ({
    id,
    borderRadius = "var(--FileContainerRounding)",
    backgroundColor = "var(--fileContainerBackground)",
    separatorColor = "var(--separatorColor)",
    accentColor,
    borderWidth = "2px", // Default border width
    topInscription = "Not Set!",
    fileName = "Not Set!",
    subMainText = "Not Set!",
    filledButtonInscription = "Not Set!", // Default inscription
    outlinedButtonInscription = "Not Set!", // Default inscription
    onFilledButtonClick,
    onOutlinedButtonClick,
    filledChronicleButtonHoverColor,
    oulinedChronicleButtonHoverColor,
    onTitleClick,
    onDescriptionClick,
    metadataIntegrity
}) => {

const cardRef = useRef<HTMLDivElement>(null);
const isJavaScriptFile = /\.(js|mjs|cjs|jsx|es6|es)$/i.test(fileName);
const hoverColor = isJavaScriptFile ? '#151419' : 'white';
const displayedTitle = fileName.length > 27 ? fileName.slice(0, 24) + '...' : fileName;
const containerSize = "336px";
const backgroundPatternSize = '20.75px';
const { i18n, t } = useTranslation();
const isRTL = i18n.language === 'he';
const mirrored = isRTL;
const swapButtons = isRTL;
const buttonFontFamily = isRTL 
? '"Arial", "Alef", sans-serif' 
: '"Roboto Mono", monospace';


useEffect(() => {
  const card = cardRef.current;

  const handleMouseMove = (e: MouseEvent) => {
      if (card) {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          const angle = Math.atan2(-x, y);
          card.style.setProperty("--rotation", angle + "rad");
      }
  };

  if (card) {
      card.addEventListener("mousemove", handleMouseMove);
  }

  return () => {
      if (card) {
          card.removeEventListener("mousemove", handleMouseMove);
      }
  };
}, []);

return (
<div
  className={styles.card}
  style={{
    position: 'relative',
    zIndex: 555,
    width: containerSize,
    height: containerSize,
    display: 'grid',
    placeContent: 'center',
    placeItems: 'center',
    textAlign: 'center',
    boxShadow: '1px 12px 25px rgba(0, 0, 0, 0.78)',
    borderRadius: borderRadius,
    border: `${borderWidth} solid transparent`,
    '--rotation': isRTL ? '2.1rad' : '4.2rad',
    backgroundImage: metadataIntegrity
      ? `
        linear-gradient(45deg, ${backgroundColor} 25%, transparent 25%, transparent 75%, ${backgroundColor} 75%),
        linear-gradient(-45deg, ${backgroundColor} 25%, transparent 25%, transparent 75%, ${backgroundColor} 75%),
        linear-gradient(calc(var(--rotation)), ${accentColor} 0, ${backgroundColor} 29%, transparent 85%)
      `
      : `
        linear-gradient(45deg, ${backgroundColor} 25%, ${backgroundColor} 25%, ${backgroundColor} 75%, ${backgroundColor} 75%),
        linear-gradient(-45deg, ${backgroundColor} 25%, ${backgroundColor} 25%, ${backgroundColor} 75%, ${backgroundColor} 75%),
        linear-gradient(calc(var(--rotation)), var(--generalErrorColor) 0, var(--generalErrorColor) 100%, transparent 80%)
      `,
    backgroundSize: metadataIntegrity
      ? `${backgroundPatternSize} ${backgroundPatternSize}, ${backgroundPatternSize} ${backgroundPatternSize}, 100% 100%`
      : '100% 100%, 100% 100%',
    backgroundOrigin: 'padding-box, padding-box, border-box',
    backgroundClip: 'padding-box, padding-box, border-box',
    backgroundColor: backgroundColor,
    '--bauhaus-primary-color': '#f0f0f1',
    color: 'var(--bauhaus-primary-color)',
    '--bauhaus-secondary-color': '#ddd',
    fontFamily: '"Roboto Mono", monospace',
    '--bauhaus-bg-color': backgroundColor,
    '--bauhaus-accent-color': accentColor,
    '--bauhaus-border-width': borderWidth,
  } as React.CSSProperties}
  ref={cardRef}
>

      <div style={{
                transform: mirrored ? 'scaleX(-1)' : 'none'
              }}
              className={styles['card-header']}>
          <div className={styles.date} style={{
                transform: mirrored ? 'scaleX(-1)' : 'none',
                fontFamily: isRTL ? '"Arial", "Alef", sans-serif' : '"Roboto Mono", monospace' }}>
              {isRTL ? (
                <>
                  {topInscription} :{t('size')}
                </>
              ) : (
                <>
                  {t('size')}: {topInscription}
                </>
              )}
          </div>
          
          <div 
              className={styles.moreOptions} 
          >
              <svg viewBox="0 0 24 24" fill="var(--bauhaus-primary-color)" className={styles.size6}>
                  {/*
                  <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5" clipRule="evenodd" />
                  */}
              </svg>
          </div>
      </div>
      <div className={styles['card-body']}>
      <h1 
        style={{ 
            direction: isRTLCheck(displayedTitle) ? 'rtl' : 'ltr', 
            color: accentColor,
            fontFamily: isRTLCheck(displayedTitle) ? '"Arial", "Alef", sans-serif' : '"Roboto Mono", monospace'
        }}
        className="text"
        onClick={() => onTitleClick(id)}
        >
        <span className="title" title={displayedTitle}>{displayedTitle}</span>
        <span className="text-effect" style={{ backgroundColor: accentColor }}></span>
      </h1>

      <p 
        style={{ 
          direction: isRTLCheck(subMainText) ? 'rtl' : 'ltr',
          fontFamily: isRTLCheck(subMainText) ? '"Arial", "Alef", sans-serif' : '"Roboto Mono", monospace'
        }} 
        className="description" 
        onClick={() => onDescriptionClick(id)}
      >
        {subMainText}
      </p>
      </div>
      <div className={styles['card-footer']} style={{ borderTop: `0.063rem solid ${separatorColor}` }}>
        <div className={styles['button-container']}>
            {swapButtons ? (
                <>
                    <ChronicleButton 
                        text={outlinedButtonInscription} 
                        outlined={true} 
                        width="136px" 
                        onClick={() => onOutlinedButtonClick(id)} 
                        hoverColor={oulinedChronicleButtonHoverColor} 
                        outlinedButtonBackgroundOnHover="var(--fileContainerBackground)"
                        fontFamily={buttonFontFamily}
                    />
                    <ChronicleButton 
                        text={filledButtonInscription} 
                        width="136px" 
                        onClick={() => onFilledButtonClick(id)} 
                        hoverColor={filledChronicleButtonHoverColor}
                        fontFamily={buttonFontFamily}
                    />
                </>
            ) : (
                <>
                    <ChronicleButton 
                        text={filledButtonInscription} 
                        width="136px" 
                        onClick={() => onFilledButtonClick(id)} 
                        hoverColor={filledChronicleButtonHoverColor}
                        fontFamily={buttonFontFamily}
                    />
                    <ChronicleButton 
                        text={outlinedButtonInscription} 
                        outlined={true} 
                        width="136px" 
                        onClick={() => onOutlinedButtonClick(id)} 
                        hoverColor={oulinedChronicleButtonHoverColor} 
                        outlinedButtonBackgroundOnHover="var(--fileContainerBackground)"
                        fontFamily={buttonFontFamily}
                    />
                </>
            )}
        </div>
      </div>
      <style jsx>{`
        .text {
          font-size: 20px;
          font-weight: bold;
          letter-spacing: -.01em;
          line-height: normal;
          margin-bottom: -1px;
          width: auto;
          transition: color 0.3s ease;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transform: translateY(-23px);
        }
        .text:hover {
          color: ${hoverColor} !important;
        }
        .title {
          position: relative;
          z-index: 10;
          font-size: 17.6px;
          padding: 2px 4px;
        }
        .text-effect {
          clip-path: polygon(0 50%, 100% 50%, 100% 50%, 0 50%);
          transform-origin: center;
          transition: all cubic-bezier(.1,.5,.5,1) 0.4s;
          position: absolute;
          left: -4px;
          right: -4px;
          top: -4px;
          bottom: -4px;
          z-index: 0;
        }
        .text:hover > .text-effect {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
        }
        .filesize {
          font-size: 16px;
          color: white;
          padding-top: 16px;
        }
        .description {
          font-size: 17px;
          color: white;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
          cursor: pointer;
          transform: translateY(-4px);
        }
        .button-container {
          display: flex;
          justify-content: center;
          gap: 10px;
          padding-top: 16px;
        }
      `}</style>
   </div>
);
};

export default BauhausFileCard;