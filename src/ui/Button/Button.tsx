import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  handle: () => void;
  isActive?: boolean;
}

export const Button = ({ text, handle, isActive }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${isActive ? styles.active : ''}`}
      onClick={handle}
    >
      {text}
    </button>
  )
}
