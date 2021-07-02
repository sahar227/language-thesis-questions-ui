import React from "react";
import styles from "./AnswerButton.module.css";

const yes = "כן";
const no = "לא";

export default function AnswerButton({ answer, giveAnswerFunction }) {
  return (
    <div className={styles.button} onClick={() => giveAnswerFunction(answer)}>
      {answer ? yes : no}
    </div>
  );
}
