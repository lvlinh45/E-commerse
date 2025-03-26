import React, { useState, useEffect, useCallback } from "react";
import { BackToTopIcon } from "../../assets/icons/Icons";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const checkScrollTop = useCallback(() => {
    if (!isVisible && window.pageYOffset > 300) {
      setIsVisible(true);
    } else if (isVisible && window.pageYOffset <= 300) {
      setIsVisible(false);
    }
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [checkScrollTop]);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "6px",
            backgroundColor: "#1b1b1b",
            color: "white",
            border: "none",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            fontSize: "20px",
            cursor: "pointer",
            zIndex: 100,
            lineHeight: 1,
          }}
        >
          <BackToTopIcon></BackToTopIcon>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
