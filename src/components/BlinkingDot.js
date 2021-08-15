import { useEffect, useState } from "react";

const BlinkingDot = ({ blinking, ...otherProps }) => {
  let isMounted=true;
  const [dot, setDot] = useState("•");
  useEffect(() => {
    if(isMounted){
    if (blinking) {
      setTimeout(() => {
        if (dot === " ") setDot("•");
        if (dot === "•") setDot(` `);
      }, 600);
    } else {
      setDot("•");
    };
  }
  return () =>{isMounted=false};
  }, [blinking, dot]);
  return <span {...otherProps}>{dot}</span>;
};

export default BlinkingDot;
