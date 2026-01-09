// src/hooks/useScreenSize.js

import { useState, useEffect } from 'react';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(getScreenSize());

  function getScreenSize() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width >= 768 && width < 1024) return 'tablet';
    return 'desktop';
  }

  useEffect(() => {
    let timeoutId = null;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScreenSize(getScreenSize());
      }, 150); // Debounce resize by 150ms
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
