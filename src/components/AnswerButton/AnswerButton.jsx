import React from "react";
import styles from "./AnswerButton.module.css";

const yes = "כן";
const no = "לא";

export default function AnswerButton({ answer, giveAnswerFunction }) {
  const handleKeyPress = (e) => {
    console.log("test");
    console.log(e.target.value);
  };
  return (
    <div
      className={styles.button}
      onKeyDown={handleKeyPress}
      onClick={() => giveAnswerFunction(answer)}
    >
      {answer ? yes : no}
    </div>
  );
}
