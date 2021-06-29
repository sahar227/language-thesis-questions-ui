// word: {word, translation, imageURL}
// question: {word, letter, answer, imageURL}
// for each word, create 8 questions - 4 with correct answer, 4 with incorrect answer

import getRandomInt from "./getRandomInt";
import shuffle from "./shuffle";

const getAllTranslationsFromTrails = (trails) => {
  return trails.map((trail) => trail.translation);
};

const createQuestionWithCorrectTranslation = ({ word, translation }) => {
  return { word, translation, answer: true };
};

const createQuestionWithWrongTranslation = (
  { word, translation },
  allTranslations
) => {
  // TODO: Make more efficient
  const allLettersNotInWord = allLetters.filter(
    (item) => ![...word].includes(item)
  );

  const allWrongTranslations = allTranslations.filter(
    (tr) => tr !== translation
  );

  const charIndex = getRandomInt(allWrongTranslations.length);
  const wrongTranslation = allWrongTranslations[charIndex];
  return { word, translation: wrongTranslation, answer: false };
};

export default function createQuestionsPhase2(trails) {
  const allTranslations = getAllTranslationsFromTrails(trails);
  const questions = [];

  for (const trail of trails) {
    questions.push(createQuestionWithCorrectTranslation(trail));
    questions.push(createQuestionWithWrongTranslation(trail, allTranslations));
  }

  return [
    shuffle(questions),
    shuffle(questions),
    shuffle(questions),
    shuffle(questions),
  ];
}
