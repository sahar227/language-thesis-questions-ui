import React, { useCallback, useEffect, useRef, useState } from "react";
import { sendReportPhase1 } from "../../api/sendQuestionReports";
import { audioCache } from "../../App";
import { useSessionIdState } from "../../context/SessionProvider";
import AnswerControls from "../AnswerControls/AnswerControls";
import styles from "./Phase1QuestionsManager.module.css";

const showLetterTimeInMS = 500;
const timeoutSeconds = 30;
const timeoutMilliSeconds = timeoutSeconds * 1000;

const LetterPhase = ({ letter, setShowingLetter }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowingLetter(false);
    }, showLetterTimeInMS);
    return () => clearTimeout(timeout);
  }, [setShowingLetter]);

  return <h1 className={styles.letter}>{letter}</h1>;
};

const QuestionPhase = React.memo(
  ({
    question,
    setNextQuestion,
    addReportForQuestion,
    isPractice,
    setShowingLetter,
  }) => {
    const startTime = performance.now();
    const { word, answer, imageURL, letter } = question;
    const giveAnswer = useCallback(
      async (userAnswer) => {
        if (isPractice) {
          if (userAnswer !== answer) {
            alert("נסה שנית");
            setShowingLetter(true);
          } else {
            alert("תשובה נכונה!");
            await setNextQuestion();
          }
          return;
        }
        const isTimeout = userAnswer === null;
        const report = {
          word,
          letter,
          answer,
          userAnswer: !isTimeout ? userAnswer : undefined,
          secondsToAnswer: !isTimeout
            ? (performance.now() - startTime) / 1000
            : timeoutSeconds,
        };
        addReportForQuestion(report);
        await setNextQuestion();
      },
      [
        addReportForQuestion,
        answer,
        isPractice,
        letter,
        setNextQuestion,
        setShowingLetter,
        startTime,
        word,
      ]
    );

    useEffect(() => {
      if (isPractice) return;
      const timeout = setTimeout(async () => {
        alert("עבר הזמן!");
        await giveAnswer(null);
      }, timeoutMilliSeconds);

      return () => clearTimeout(timeout);
    }, [isPractice, giveAnswer]);

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {isPractice && (
          <p className={styles.question}>
            האם האות שהוצגה קודם מופיעה במילה הבאה?
          </p>
        )}
        <h1 className={styles.word}>{word}</h1>
        <img className={styles.image} src={imageURL} alt={word} />
        <AnswerControls giveAnswerFunction={giveAnswer} />
      </div>
    );
  }
);

export default function Phase1QuestionsManager({
  questions,
  nextScreen,
  isPractice = false,
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showingLetter, setShowingLetter] = useState(true);
  const [sessionId] = useSessionIdState();
  const [loading, setLoading] = useState(false);

  const questionReportPhase1 = useRef([]);
  const addReportForQuestion = (report) =>
    questionReportPhase1.current.push(report);

  const setNextQuestion = async () => {
    if (currentQuestionIndex === questions.length - 1) {
      setLoading(true);
      await sendReportPhase1(sessionId, questionReportPhase1.current);
      setLoading(false);
      nextScreen();
    } else {
      setShowingLetter(true);
      setCurrentQuestionIndex((current) => current + 1);
    }
  };
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (showingLetter) return;
    audioCache[currentQuestion.word]?.play();
    // eslint-disable-next-line
  }, [showingLetter]);

  if (loading) return <p>טוען...</p>;

  return (
    <div className={styles.container}>
      {showingLetter && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LetterPhase
            letter={currentQuestion.letter}
            setShowingLetter={setShowingLetter}
          />
        </div>
      )}
      {!showingLetter && (
        <QuestionPhase
          question={currentQuestion}
          setNextQuestion={setNextQuestion}
          addReportForQuestion={addReportForQuestion}
          isPractice={isPractice}
          setShowingLetter={setShowingLetter}
        />
      )}
    </div>
  );
}
