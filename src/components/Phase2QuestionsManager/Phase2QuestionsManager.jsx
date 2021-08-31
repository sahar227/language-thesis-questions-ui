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

export default function Phase1QuestionsManager({
  questions,
  addReportForQuestion,
  nextScreen,
  isPractice = false,
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setuserAnswer] = useState(null);

  const setNextQuestion = () => {
    setuserAnswer(null);
    if (currentQuestionIndex === questions.length - 1) nextScreen();
    else setCurrentQuestionIndex((current) => current + 1);
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
