import { useEffect, useState } from "react";

export function useWindowSize() {
  const [isPC, setIsPC] = useState(window.innerWidth > 800);
  const [isTable, setIsTable] = useState(
    window.innerWidth <= 800 && window.innerWidth > 550
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 550);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;


      setIsPC(width > 800);
      setIsTable(width <= 800 && width > 550);
      setIsMobile(width <= 550);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isPC, isTable, isMobile };
}
