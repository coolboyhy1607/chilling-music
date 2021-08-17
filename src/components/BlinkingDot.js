import { useEffect, useState } from "react";

const BlinkingDot = ({ blinking, ...otherProps }) => {
  const [isMounted,setIsMounted] =useState(true);
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
  return () =>{setIsMounted(false)};
  // eslint-disable-next-line
  }, [blinking, dot]);
  return <span {...otherProps}>{dot}</span>;
};

export default BlinkingDot;
