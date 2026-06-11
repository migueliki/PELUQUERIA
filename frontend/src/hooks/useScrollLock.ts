import { useEffect } from 'react';

export const useScrollLock = (lock: boolean) => {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (lock) {
      const scrollBarWidth = window.innerWidth - html.clientWidth;
      
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      body.style.paddingRight = `${scrollBarWidth}px`;
      
      // Para dispositivos táctiles
      body.style.touchAction = 'none';
    } else {
      html.style.overflow = '';
      body.style.overflow = '';
      body.style.paddingRight = '';
      body.style.touchAction = '';
    }

    return () => {
      html.style.overflow = '';
      body.style.overflow = '';
      body.style.paddingRight = '';
      body.style.touchAction = '';
    };
  }, [lock]);
};
