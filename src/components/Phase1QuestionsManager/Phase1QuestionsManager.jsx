import React, { useEffect, useState } from "react";
import soundClient from "soundoftext-js";
import AnswerControls from "../AnswerControls/AnswerControls";
import styles from "./Phase1QuestionsManager.module.css";

const showLetterTimeInMS = 500;
const timeoutSeconds = 30;
const timeoutMilliSeconds = timeoutSeconds * 1000;

const LetterPhase = ({ letter }) => {
  return <h1 className={styles.letter}>{letter}</h1>;
};

const QuestionPhase = React.memo(
  ({ question, setNextQuestion, addReportForQuestion }) => {
    const startTime = performance.now();
    const { word, answer, imageURL, letter } = question;
    const giveAnswer = (userAnswer) => {
      const isTimeout = userAnswer === null;
      const report = {
        word,
        letter,
        answer,
        userAnswer: !isTimeout ? userAnswer : "TIME OUT",
        secondsToAnswer: !isTimeout
          ? (performance.now() - startTime) / 1000
          : timeoutSeconds,
      };
      addReportForQuestion(report);
      setNextQuestion();
    };

    useEffect(() => {
      const timeout = setTimeout(() => {
        alert("עבר הזמן!");
        giveAnswer(null);
      }, timeoutMilliSeconds);

      return () => clearTimeout(timeout);
    }, []);

    return (
      <div>
        <p className={styles.question}>
          האם האות שהוצגה קודם מופיעה במילה הבאה?
        </p>
        <h1 className={styles.word}>{word}</h1>
        <img className={styles.image} src={imageURL} />
        <AnswerControls giveAnswerFunction={giveAnswer} />
      </div>
    );
  }
);

export default function Phase1QuestionsManager({
  questions,
  addReportForQuestion,
  nextScreen,
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showingLetter, setShowingLetter] = useState(true);

  const setNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      nextScreen();
    } else setCurrentQuestionIndex((current) => current + 1);
  };
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    setShowingLetter(true);

    setTimeout(() => {
      setShowingLetter(false);
    }, showLetterTimeInMS);
  }, [currentQuestionIndex]);

  // get soundID
  // TODO: can possibly reduce time it takes, by getting all the sound urls beforehand, and maybe I can also load the mp3s themselves earlier
  useEffect(() => {
    soundClient.sounds
      .create({ text: currentQuestion.word, voice: "cy" })
      .then((soundURL) => {
        new Audio(soundURL).play();
      });
  }, [currentQuestionIndex]);

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
          <LetterPhase letter={currentQuestion.letter} />
        </div>
      )}
      {!showingLetter && (
        <QuestionPhase
          question={currentQuestion}
          setNextQuestion={setNextQuestion}
          addReportForQuestion={addReportForQuestion}
        />
      )}
    </div>
  );
}
