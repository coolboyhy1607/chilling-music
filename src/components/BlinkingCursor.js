import { useEffect, useState } from "react";

const BlinkingCursor = ({ blinking, style }) => {
  const [isMounted,setIsMounted] = useState(true);
  const [cursor, setCursor] = useState("█");
  useEffect(() => {
    if(isMounted){
      if (blinking) {
        setTimeout(() => {
          if (cursor === "") setCursor("█");
          if (cursor === "█") setCursor("");
        }, 600);
      } else {
        setCursor("█");
      };
    }
  return () =>{setIsMounted(false)};
  // eslint-disable-next-line
  }, [blinking, cursor]);
  return (
    <span
      style={{
        marginLeft: "4px",
        fontSize: "100%",
        ...style,
      }}
    >
      {cursor}
    </span>
  );
};

export default BlinkingCursor;
