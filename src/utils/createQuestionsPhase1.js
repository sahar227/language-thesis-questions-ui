// word: {word, translation, imageURL}
// question: {word, letter, answer, imageURL}
// for each word, create 8 questions - 4 with correct answer, 4 with incorrect answer

import getRandomInt from "./getRandomInt";
import shuffle from "./shuffle";

const getAllUniqueLettersFromTrails = (trails) => {
  const allLetters = trails.flatMap((trail) => trail.word.split(""));
  return [...new Set(allLetters)];
};

const createQuestionWithCorrectLetter = ({ word, imageURL }) => {
  const charIndex = getRandomInt(word.length);
  const letter = word.charAt(charIndex);
  return { word, imageURL, letter, answer: true };
};

const createQuestionWithWrongLetter = ({ word, imageURL }, allLetters) => {
  // TODO: Make more efficient
  const allLettersNotInWord = allLetters.filter(
    (item) => ![...word].includes(item)
  );
  const charIndex = getRandomInt(allLettersNotInWord.length);
  const letter = allLettersNotInWord[charIndex];
  return { word, imageURL, letter, answer: false };
};

export default function createQuestionsPhase1(trails) {
  const allLetters = getAllUniqueLettersFromTrails(trails);
  const questions = [];
  for (const trail of trails) {
    for (let i = 0; i < 4; i++) {
      questions.push(createQuestionWithCorrectLetter(trail));
    }
    for (let i = 0; i < 4; i++) {
      questions.push(createQuestionWithWrongLetter(trail, allLetters));
    }
  }

  return shuffle(questions);
}
