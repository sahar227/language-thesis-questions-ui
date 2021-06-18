// word: {word, translation, imageURL}
// question: {word, letter, answer, imageURL}
// for each word, create 8 questions - 4 with correct answer, 4 with incorrect answer

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
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
  // TODO: figure out how to get letter not in word efficiently
  return { word, imageURL, letter: "f", answer: false };
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
