import React, { useEffect, useRef, useState } from "react";
import AnswerControls from "../AnswerControls/AnswerControls";
import styles from "./Phase2QuestionsManager.module.css";
import { useSessionIdState } from "../../context/SessionProvider";
import { sendReportPhase2Block } from "../../api/sendQuestionReports";
import { audioCache } from "../../App";

const QuestionPhase = ({
  question,
  userAnswer,
  setuserAnswer,
  addReportForQuestion,
  isPractice,
}) => {
  const startTime = performance.now();
  const { word, translation, answer } = question;
  const giveAnswer = (userAnswerInput) => {
    const report = {
      word,
      translation,
      answer,
      userAnswer: userAnswerInput,
      secondsToAnswer: (performance.now() - startTime) / 1000,
    };
    addReportForQuestion(report);
    setuserAnswer(userAnswerInput);
  };

  return (
    <div>
      {isPractice && (
        <p className={styles.question}>האם התרגום למילה הבאה נכון?</p>
      )}
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
  nextScreen,
  isPractice = false,
}) {
  const [blockIndex, setBlockIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setuserAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  const questions = blocks[blockIndex];

  const questionReportBlock = useRef([]);
  const addReportForQuestion = (report) =>
    questionReportBlock.current.push(report);

  const [sessionId] = useSessionIdState();

  const setNextQuestion = async () => {
    setuserAnswer(null);
    if (currentQuestionIndex === questions.length - 1) {
      // Block ended
      if (!isPractice) {
        setLoading(true);
        await sendReportPhase2Block(sessionId, questionReportBlock.current);
        setLoading(false);
      }
      questionReportBlock.current = [];
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

  useEffect(() => {
    audioCache[currentQuestion.word]?.play();
    // eslint-disable-next-line
  }, [currentQuestion]);

  if (loading) return <p>טוען...</p>;

  return (
    <div className={styles.container}>
      <QuestionPhase
        question={currentQuestion}
        setuserAnswer={setuserAnswer}
        userAnswer={userAnswer}
        addReportForQuestion={addReportForQuestion}
        isPractice={isPractice}
      />
      {userAnswer !== null && (
        <div>
          <p style={{ fontSize: "30px", fontWeight: "bold" }}>
            {currentQuestion.answer === userAnswer ? "נכון" : "לא נכון"}
          </p>
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
