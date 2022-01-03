import React, { useCallback, useEffect, useRef, useState } from "react";
import AnswerControls from "../AnswerControls/AnswerControls";
import styles from "./Phase2QuestionsManager.module.css";
import { useSessionIdState } from "../../context/SessionProvider";
import { sendReportPhase2Block } from "../../api/sendQuestionReports";
import { audioCache } from "../../App";

const QuestionPhase = React.memo(
  ({
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
  }
);

export default function Phase2QuestionsManager({
  blocks,
  nextScreen,
  isPractice = false,
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const blockSize = blocks[0].length;
  const blockIndex = (currentQuestionIndex / blockSize) | 0;
  const questionIndexInBlock = currentQuestionIndex % blockSize;
  const currentQuestion = blocks[blockIndex][questionIndexInBlock];

  const questionReportBlock = useRef([]);
  const addReportForQuestion = useCallback(
    (report) => questionReportBlock.current.push(report),
    [questionReportBlock]
  );

  const [sessionId] = useSessionIdState();

  const setNextQuestion = async () => {
    const isBlockEnd = currentQuestionIndex % blockSize === blockSize - 1;
    if (isBlockEnd) {
      if (!isPractice) {
        setLoading(true);
        await sendReportPhase2Block(sessionId, questionReportBlock.current);
        setLoading(false);
      }
      questionReportBlock.current = [];
      const isLastQuestion =
        currentQuestionIndex === blocks.length * blockSize - 1;
      if (isLastQuestion) return nextScreen();
    }
    setCurrentQuestionIndex((current) => current + 1);
  };

  if (loading) return <p>טוען...</p>;

  return (
    <Question
      key={currentQuestionIndex}
      question={currentQuestion}
      isPractice={isPractice}
      addReportForQuestion={addReportForQuestion}
      setNextQuestion={setNextQuestion}
    />
  );
}

const Feedback = ({ text, color }) => {
  return <p style={{ fontSize: "30px", fontWeight: "bold", color }}>{text}</p>;
};

const getFeedbackProps = (answer) => {
  if (answer)
    return {
      text: "נכון",
      color: "green",
    };
  return {
    text: "לא נכון",
    color: "red",
  };
};

const Question = ({
  question,
  addReportForQuestion,
  isPractice,
  setNextQuestion,
}) => {
  const [userAnswer, setuserAnswer] = useState(null);
  const isAnswerCorrect = userAnswer === question.answer;

  useEffect(() => {
    audioCache[question.word]?.play();
  }, [question]);

  useEffect(() => {
    if (isPractice && !isAnswerCorrect) return;
    if (userAnswer === null) return;
    const timeout = setTimeout(() => {
      setNextQuestion();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [isPractice, isAnswerCorrect, userAnswer, setNextQuestion]);

  return (
    <div className={styles.container}>
      <QuestionPhase
        question={question}
        setuserAnswer={setuserAnswer}
        userAnswer={userAnswer}
        addReportForQuestion={addReportForQuestion}
        isPractice={isPractice}
      />
      {userAnswer !== null && (
        <div>
          <Feedback {...getFeedbackProps(question.answer === userAnswer)} />
          {isPractice && !isAnswerCorrect && (
            <button onClick={() => setuserAnswer(null)}>נסה שנית</button>
          )}
        </div>
      )}
    </div>
  );
};
