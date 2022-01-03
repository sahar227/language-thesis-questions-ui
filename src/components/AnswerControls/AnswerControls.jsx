import React, { useEffect, useRef } from "react";
import AnswerButton from "../AnswerButton/AnswerButton";

export default React.memo(function AnswerControls({ giveAnswerFunction }) {
  const lastAnswered = useRef(false);
  useEffect(() => {
    const handleClick = (e) => {
      if (lastAnswered.current) {
        console.log("Tried to give answer twice!");
        return;
      }
      switch (e.keyCode) {
        case 37:
          lastAnswered.current = true;
          giveAnswerFunction(false);
          break;
        case 39:
          lastAnswered.current = true;
          giveAnswerFunction(true);
          break;
        default:
          break;
      }
    };
    document.addEventListener("keyup", handleClick);

    return () => {
      document.removeEventListener("keyup", handleClick);
    };
  }, [giveAnswerFunction]);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <AnswerButton answer={true} giveAnswerFunction={giveAnswerFunction} />
      <AnswerButton answer={false} giveAnswerFunction={giveAnswerFunction} />
    </div>
  );
});
