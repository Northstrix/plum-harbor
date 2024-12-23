"use client"
import React, { useEffect, useRef } from 'react';
import styles from './BauhausPopUpModal.module.css';
import "@fontsource/roboto-mono/700.css";
import "@/app/globals.css";
import { useTranslation } from 'react-i18next';

interface BauhausPopUpModalProps {
    mainInscription: string;
    secondaryInscription: string;
    secondaryInscription2: string;
    progress?: number;
}
// Utility function to determine if text is RTL
const isRTLCheck = (text: string): boolean => {
    return /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F]/.test(text); // Hebrew, Arabic, and Persian ranges in Unicode
};

const BauhausPopUpModal: React.FC<BauhausPopUpModalProps> = ({
    mainInscription,
    secondaryInscription,
    secondaryInscription2,
    progress = 0,
}) => {

const cardRef = useRef<HTMLDivElement>(null);
const borderRadius = "var(--loginFormBorderRadius)";
const backgroundPatternSize = '24px';
const borderWidth = "0px";
const metadataIntegrity = true;
const backgroundColor = "var(--background)";
const accentColor = "var(--secondThemeColor)";
const { i18n } = useTranslation();
const isRTL = i18n.language === 'he';

return (
    <div className={styles.modal}>
<div
  className={styles.card}
  style={{
    position: 'relative',
    zIndex: 555,
    width: '720px',
    height: '212px',
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
        linear-gradient(calc(var(--rotation)), ${accentColor} 0, ${backgroundColor} 20%, transparent 85%)
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

      <div className={styles['card-header']}>
          <div 
              className={styles.moreOptions} 
          >
          </div>
      </div>
      <div className={styles['card-body']}>
      <h1 
        style={{ 
            direction: isRTLCheck(mainInscription) ? 'rtl' : 'ltr', 
            color: "var(--foreground)",
            fontFamily: isRTLCheck(mainInscription) ? '"Arial", "Alef", sans-serif' : '"Roboto Mono", monospace'
        }}
        className="text"
        >
        <span className="title" title={mainInscription}>{ mainInscription}</span>
        <span className="text-effect" style={{ backgroundColor: accentColor }}></span>
      </h1>

      <p 
        style={{ 
          direction: isRTLCheck(secondaryInscription) ? 'rtl' : 'ltr',
          fontFamily: isRTLCheck(secondaryInscription) ? '"Arial", "Alef", sans-serif' : '"Roboto Mono", monospace'
        }} 
        className="description" 
      >
        {secondaryInscription}
      </p>
      <p 
        style={{ 
          direction: isRTLCheck(secondaryInscription2) ? 'rtl' : 'ltr',
          fontFamily: isRTLCheck(secondaryInscription2) ? '"Arial", "Alef", sans-serif' : '"Roboto Mono", monospace'
        }} 
        className="description" 
      >
        {secondaryInscription2}
      </p>
        <div className={styles.progress}>
            <div style={{
                    transform: isRTL ? 'scaleX(-1)' : 'none'
                    }}
                    className={styles['progress-bar']}>
                <div 
                    className={styles['progress-bar-after']} 
                    style={{
                        width: `${(progress / 100) * 100}%`, 
                        backgroundColor: accentColor, height: '5px', borderRadius: '3.125rem'
                    }} 
                />
            </div>
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
        .title {
          position: relative;
          z-index: 10;
          font-size: 30.24px;
          padding: 2px 4px;
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
          padding-bottom: 10px;
        }
        .button-container {
          display: flex;
          justify-content: center;
          gap: 10px;
          padding-top: 16px;
        }
      `}</style>
   </div>
   </div>
);
};

export default BauhausPopUpModal;
