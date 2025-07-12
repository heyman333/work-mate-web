import { useState, useEffect } from "react";

interface ViewportSize {
  width: number;
  height: number;
  isMobile: boolean;
}

const MOBILE_BREAKPOINT = 768;

export function useViewportSize(): ViewportSize {
  const [viewportSize, setViewportSize] = useState<ViewportSize>(() => {
    if (typeof window !== "undefined") {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < MOBILE_BREAKPOINT,
      };
    }
    return {
      width: 0,
      height: 0,
      isMobile: false,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < MOBILE_BREAKPOINT,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 초기값 설정

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return viewportSize;
}