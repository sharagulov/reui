import React from 'react';
import { useCurtain } from './contexts/CurtainContext';
import './Сurtain.scss';

export default function CurtainOverlay() {
  const { isVisible } = useCurtain();
  return (
    <div className={`curtain-overlay ${isVisible ? 'visible' : ''}`}/>
  );
}
