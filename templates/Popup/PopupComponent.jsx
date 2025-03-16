import React from 'react';
import { HiOutlineX } from "react-icons/hi";
import { usePopup } from '/contexts/PopupContext';
import './Popup.scss';

export default function PopupComponent() {
  const { isVisible, hidePopup } = usePopup();

  return (
    <div className={`popup-overlay ${isVisible ? "visible" : ""}`}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className='popup-header'>
          <HiOutlineX className="popup-close" size={22} onClick={hidePopup}/>
        </div>
      </div>
    </div>
  );
}
