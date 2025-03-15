import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// CONTEXT TO MANAGE THE CURTAIN TRANSITION EFFECT
const CurtainContext = createContext();

export function CurtainProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);
  const location = useLocation();
  const prevLocation = useRef(location.pathname);

  /**
   * SHOWS THE CURTAIN AND HIDES IT AFTER A SPECIFIED DURATION
   * IF NO DURATION IS PROVIDED, IT STAYS VISIBLE UNTIL HIDDEN MANUALLY
   */
  const showCurtain = (duration) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(true);
    if (duration && typeof duration === 'number') {
      timeoutRef.current = setTimeout(hideCurtain, duration);
    }
  };

  /**
   * HIDES THE CURTAIN IMMEDIATELY AND CLEARS ANY ACTIVE TIMEOUTS
   */
  const hideCurtain = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  };

  useEffect(() => {
    const from = prevLocation.current;
    const to = location.pathname;

    /**
     * LIST OF ALLOWED ROUTE TRANSITIONS THAT WILL TRIGGER THE CURTAIN EFFECT
     */
    const allowedTransitions = [
      ["/login", "/register"],
      ["/register", "/login"], 
    ];

    /**
     * CHECK IF THE CURRENT ROUTE TRANSITION MATCHES THE ALLOWED TRANSITIONS
     * IF IT MATCHES, SHOW THE CURTAIN FOR 1.5 SECONDS
     */
    const shouldShowCurtain = allowedTransitions.some(
      ([fromPath, toPath]) => from === fromPath && to === toPath
    );

    if (shouldShowCurtain) {
      showCurtain(1500);
    }

    prevLocation.current = to;
  }, [location]);

  return (
    <CurtainContext.Provider value={{ isVisible, showCurtain, hideCurtain }}>
      {children}
    </CurtainContext.Provider>
  );
}

/**
 * CUSTOM HOOK TO ACCESS THE CURTAIN CONTEXT
 */
export function useCurtain() {
  return useContext(CurtainContext);
}
