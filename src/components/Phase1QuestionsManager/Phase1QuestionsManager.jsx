import React, { useEffect, useState } from "react";

// TODO: Play sound
// TODO 2:style this component

const showLetterTimeInMS = 1000;

const LetterPhase = ({ letter }) => {
  return (
    <div>
      <p>{letter}</p>
    </div>
  );
};

const QuestionPhase = ({ question, setNextQuestion, addReportForQuestion }) => {
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
      <h1>{word}</h1>
      <h1>{answer.toString()}</h1>
      <img src={imageURL} />
      <button onClick={() => giveAnswer(true)}>True</button>
      <button onClick={() => giveAnswer(false)}>False</button>
    </div>
  );
};

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

  return (
    <div>
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
