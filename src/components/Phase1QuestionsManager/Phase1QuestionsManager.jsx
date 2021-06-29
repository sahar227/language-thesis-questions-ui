import React, { useEffect, useState } from "react";
import soundClient from "soundoftext-js";
import styles from "./Phase1QuestionsManager.module.css";

const showLetterTimeInMS = 1000;

const LetterPhase = ({ letter }) => {
  return <h1 className={styles.letter}>{letter}</h1>;
};

const QuestionPhase = React.memo(
  ({ question, setNextQuestion, addReportForQuestion }) => {
    const startTime = performance.now();
    const { word, answer, imageURL, letter } = question;
    const giveAnswer = (userAnswer) => {
      const report = {
        word,
        letter,
        answer,
        userAnswer,
        secondsToAnser: (performance.now() - startTime) / 1000,
      };
      addReportForQuestion(report);
      setNextQuestion();
    };
    return (
      <div>
        <p>האם האות מופיעה במילה הבאה?</p>
        <h1>{word}</h1>
        <img className={styles.image} src={imageURL} />
        <div className={styles.buttons}>
          <div className={styles.button} onClick={() => giveAnswer(true)}>
            כן
          </div>
          <div className={styles.button} onClick={() => giveAnswer(false)}>
            לא
          </div>
        </div>
      </div>
    );
  }
);

export default function Phase1QuestionsManager({
  questions,
  addReportForQuestion,
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showingLetter, setShowingLetter] = useState(true);

  const setNextQuestion = () => {
    setCurrentQuestionIndex((current) => current + 1);
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
      {showingLetter && <LetterPhase letter={currentQuestion.letter} />}
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
