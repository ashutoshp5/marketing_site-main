import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error scrolling to the top:", error);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
