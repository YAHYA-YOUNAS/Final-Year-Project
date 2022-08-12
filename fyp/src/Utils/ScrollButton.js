import React, { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import { Button } from "./ScrollButtonStyles";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return () => {
      setVisible();
    };
  }, []);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    const width = document.documentElement.clientWidth;

    if (scrolled > 100 && width > 768) {
      setVisible(true);
    } else if (scrolled <= 100 && width <= 768) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <Button>
      <FaArrowCircleUp
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
      />
    </Button>
  );
};

export default ScrollButton;
