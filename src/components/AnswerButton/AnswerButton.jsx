import React from "react";
import styles from "./AnswerButton.module.css";
import LeftArrow from "../../assets/left.png";
import RightArrow from "../../assets/right.png";

const yes = "כן";
const no = "לא";

export default function AnswerButton({ answer, giveAnswerFunction }) {
  const handleKeyPress = (e) => {
    console.log("test");
    console.log(e.target.value);
  };
  return (
    <div className={styles.buttonContainer}>
      <div
        className={styles.button}
        onKeyDown={handleKeyPress}
        onClick={() => giveAnswerFunction(answer)}
      >
        {answer ? yes : no}
      </div>
      {answer ? (
        <img
          src={RightArrow}
          className={styles.arrow}
          alt="Right keyboard arrow"
        />
      ) : (
        <img
          src={LeftArrow}
          className={styles.arrow}
          alt="Left keyboard arrow"
        />
      )}
    </div>
  );
}
