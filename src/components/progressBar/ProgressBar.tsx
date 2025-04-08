import React, { useEffect, useState } from "react";
import "./ProgressBar.scss";

const ProgressBar: React.FC = () => {
  const [scrollWidth, setScrollWidth] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const width = (scrollTop / height) * 100;
      setScrollWidth(width);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <div className="progress" style={{ width: `${scrollWidth}%` }} />;
};

export default ProgressBar;
