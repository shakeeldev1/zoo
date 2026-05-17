import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // This will run every time the 'pathname' (URL) changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component doesn't render anything visual
};

export default ScrollToTop;