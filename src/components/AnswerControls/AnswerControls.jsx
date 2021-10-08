import React, { useEffect } from "react";
import AnswerButton from "../AnswerButton/AnswerButton";

export default function AnswerControls({ giveAnswerFunction }) {
  useEffect(() => {
    const handleClick = async (e) => {
      switch (e.keyCode) {
        case 37:
          await giveAnswerFunction(false);
          break;
        case 39:
          await giveAnswerFunction(true);
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", handleClick);

    return () => document.removeEventListener("keydown", handleClick);
  }, [giveAnswerFunction]);

  return (
    <div>
      <AnswerButton answer={true} giveAnswerFunction={giveAnswerFunction} />
      <AnswerButton answer={false} giveAnswerFunction={giveAnswerFunction} />
    </div>
  );
}
