import { useState, useEffect } from "react";

const useMagicColor = () => {
  const [color, setColor] = useState("red");

  useEffect(() => {
    const interval = setInterval(() => {
      const newColor = Math.floor(Math.random() * 999999);
      setColor(`#${newColor}`);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return color;
};

export { useMagicColor };
