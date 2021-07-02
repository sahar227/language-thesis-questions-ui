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

  // TODO: Maybe each block should have different questions and not the same ones reordered.
  return [
    shuffle(questions),
    shuffle(questions),
    shuffle(questions),
    shuffle(questions),
  ];
}
