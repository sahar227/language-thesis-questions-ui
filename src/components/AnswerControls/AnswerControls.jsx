import React, { useEffect } from "react";
import AnswerButton from "../AnswerButton/AnswerButton";

export default function AnswerControls({ giveAnswerFunction }) {
  useEffect(() => {
    const handleClick = (e) => {
      switch (e.keyCode) {
        case 37:
          giveAnswerFunction(false);
          break;
        case 39:
          giveAnswerFunction(true);
          break;
      }
    };
    document.addEventListener("keydown", handleClick);

    return () => document.removeEventListener("keydown", handleClick);
  }, []);

  return (
    <div>
      <AnswerButton answer={true} giveAnswerFunction={giveAnswerFunction} />
      <AnswerButton answer={false} giveAnswerFunction={giveAnswerFunction} />
    </div>
  );
}
