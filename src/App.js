import StartPage from "./pages/StartPage/StartPage";
import "./App.css";
import { useState } from "react";
import Phase1 from "./pages/Phase1/Phase1";
import Phase2 from "./pages/Phase2/Phase2";
import startSession from "./api/startSession";
import createQuestionsPhase1 from "./utils/createQuestionsPhase1";
import createQuestionsPhase2 from "./utils/createQuestionsPhase2";
import EndScreen from "./pages/EndScreen/EndScreen";
import soundClient from "soundoftext-js";

const imagesCache = [];
function preloadImage(url) {
  var img = new Image();
  img.src = url;
  imagesCache.push(img);
}

export const audioCache = {};
function preloadAudio(word) {
  // voices reference: https://soundoftext.com/docs#voices
  soundClient.sounds.create({ text: word, voice: "en-US" }).then((soundURL) => {
    audioCache[word] = new Audio(soundURL);
  });
}

function App() {
  const [questionsPhase1, setQuestionsPhase1] = useState([]);
  const [questionsPhase2, setQuestionsPhase2] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [screenID, setScreenID] = useState(0);

  const nextScreen = () => setScreenID((cur) => cur + 1);

  const startSessionSubmit = async (code) => {
    try {
      setIsLoading(true);
      const { session, wordsPhase1, wordsPhase2 } = await startSession(code);
      wordsPhase1.map((v) => {
        preloadImage(v.imageURL);
        preloadAudio(v.word);
        return null;
      }); // preload all of the assets phase1
      wordsPhase2.map((v) => {
        preloadAudio(v.word);
        return null;
      }); // preload all of the assets phase2

      const questionsPhase1 = createQuestionsPhase1(wordsPhase1);
      setQuestionsPhase1(questionsPhase1);
      const fullWordsPhase2 = [
        ...wordsPhase2,
        ...wordsPhase1.map((word) => ({
          word: word.word,
          translation: word.translation,
        })),
      ];
      const questionsPhase2 = createQuestionsPhase2(fullWordsPhase2);
      setQuestionsPhase2(questionsPhase2);
      setScreenID(session.groupNumber);
      setIsLoading(false);
    } catch {
      alert("שגיאה. אנא וודאו שהקוד שקיבלתם נכון.");
      setIsLoading(false);
    }
  };

  if (isLoading) return <p>טוען...</p>;

  return (
    <div className="container">
      {screenID === 0 && <StartPage startSessionSubmit={startSessionSubmit} />}
      {screenID === 1 && (
        <Phase1 questions={questionsPhase1} nextScreen={nextScreen} />
      )}
      {screenID === 2 && (
        <Phase2 questions={questionsPhase2} nextScreen={nextScreen} />
      )}
      {screenID === 3 && <EndScreen />}
    </div>
  );
}

export default App;
