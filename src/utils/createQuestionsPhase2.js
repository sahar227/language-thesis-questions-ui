import getRandomInt from "./getRandomInt";
import shuffle from "./shuffle";

const numberOfBlocks = 4;

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

const createBlock = (trails, allTranslations) => {
  const questions = [];
  for (const trail of trails) {
    questions.push(createQuestionWithCorrectTranslation(trail));
    questions.push(createQuestionWithWrongTranslation(trail, allTranslations));
  }
  return shuffle(questions);
};

export default function createQuestionsPhase2(trails) {
  const allTranslations = getAllTranslationsFromTrails(trails);
  const blocks = [];

  for (let i = 0; i < numberOfBlocks; i++)
    blocks.push(createBlock(trails, allTranslations));
  return blocks.flatMap((v) => v);
}
