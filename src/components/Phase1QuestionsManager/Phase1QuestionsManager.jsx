import React, { useEffect, useState } from "react";

// TODO: Show image and play sound
// TODO 2:style this component
// TODO 3: Add buttons to answer the question and ask it properly
// TODO 4: Save report of question performance: what was the question, what was the answer, what was the provided answer, how long it took

const showLetterTimeInMS = 1000;

const LetterPhase = ({ letter }) => {
  return (
    <div>
      <p>{letter}</p>
    </div>
  );
};

const QuestionPhase = ({ word, answer, imageURL, setNextQuestion }) => {
  return (
    <div>
      <h1>{word}</h1>
      <h1>{answer.toString()}</h1>
      <h1>{imageURL}</h1>
      <button onClick={setNextQuestion}>Next</button>
    </div>
  );
};

export default function Phase1QuestionsManager({ questions }) {
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
          answer={currentQuestion.answer}
          setNextQuestion={setNextQuestion}
          word={currentQuestion.word}
          imageURL={currentQuestion.imageURL}
        />
      )}
    </div>
  );
}
