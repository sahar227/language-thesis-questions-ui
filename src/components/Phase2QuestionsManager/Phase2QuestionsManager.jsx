import React, { useState } from "react";
import AnswerControls from "../AnswerControls/AnswerControls";
import styles from "./Phase2QuestionsManager.module.css";

const QuestionPhase = ({
  question,
  userAnswer,
  setuserAnswer,
  addReportForQuestion,
}) => {
  const startTime = performance.now();
  const { word, translation, answer } = question;
  const giveAnswer = (userAnswerInput) => {
    const report = {
      word,
      translation,
      answer,
      userAnswer: userAnswerInput,
      secondsToAnser: (performance.now() - startTime) / 1000,
    };
    addReportForQuestion(report);
    setuserAnswer(userAnswerInput);
  };

  return (
    <div>
      <p className={styles.question}>האם התרגום למילה הבאה נכון?</p>
      <h1 className={styles.word}>{word}</h1>
      <h1 className={styles.translation}>{translation}</h1>
      {userAnswer === null && (
        <AnswerControls giveAnswerFunction={giveAnswer} />
      )}
    </div>
  );
};

export default function Phase2QuestionsManager({
  blocks,
  addReportForQuestion,
  nextScreen,
  isPractice = false,
}) {
  const [blockIndex, setBlockIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setuserAnswer] = useState(null);

  const questions = blocks[blockIndex];

  const setNextQuestion = () => {
    setuserAnswer(null);
    if (currentQuestionIndex === questions.length - 1) {
      // Block ended
      // TODO: Send report for the block
      if (blockIndex < blocks.length - 1) {
        // Go to the next block
        setCurrentQuestionIndex(0);
        setBlockIndex((prev) => prev + 1);
      } else nextScreen(); // Go to the next screen
    } else setCurrentQuestionIndex((current) => current + 1); // Go to the next question
  };
  const currentQuestion = questions[currentQuestionIndex];

  const isAnswerCorrect =
    userAnswer !== null && currentQuestion.answer === userAnswer;

  return (
    <div className={styles.container}>
      <QuestionPhase
        question={currentQuestion}
        setuserAnswer={setuserAnswer}
        userAnswer={userAnswer}
        addReportForQuestion={addReportForQuestion}
      />
      {userAnswer !== null && (
        <div>
          <p>{currentQuestion.answer === userAnswer ? "נכון" : "לא נכון"}</p>
          {isPractice && !isAnswerCorrect && (
            <button onClick={() => setuserAnswer(null)}>נסה שנית</button>
          )}
          {(!isPractice || isAnswerCorrect) && (
            <button onClick={setNextQuestion}>שאלה הבאה</button>
          )}
        </div>
      )}
    </div>
  );
}
