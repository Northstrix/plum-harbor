"use client";
import React from 'react';
import styles from './ChronicleButton.module.css';

interface ChronicleButtonProps {
  text: string;
  onClick?: () => void;
  hoverColor?: string;
  outlinedButtonBackgroundOnHover?: string;
  width?: string;
  outlined?: boolean;
  outlinePaddingAdjustment?: string;
  fontFamily?: string;
}

const ChronicleButton: React.FC<ChronicleButtonProps> = ({ 
  text, 
  onClick, 
  hoverColor = 'var(--defaultChronicleHoverColor)', 
  outlinedButtonBackgroundOnHover = 'transparent', // Default value is transparent
  width = '160px',
  outlined = false,
  outlinePaddingAdjustment = '2px',
  fontFamily
}) => {
  const buttonStyle = {
    '--hover-color': hoverColor,
    '--text-color': outlined ? 'var(--foreground)' : 'var(--negativeForeground)',
    '--outline-padding-adjustment': outlinePaddingAdjustment,
    width: width,
    '--outlined-button-background-on-hover': outlinedButtonBackgroundOnHover,
    fontFamily: fontFamily,
  } as React.CSSProperties;

  return (
    <button 
      className={`${styles.chronicleButton} ${outlined ? styles.outlined : ''}`}
      onClick={onClick}
      style={buttonStyle}
    >
      <span><em>{text}</em></span>
      <span><em>{text}</em></span>
    </button>
  );
};

export default ChronicleButton;
