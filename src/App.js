import StartPage from "./pages/StartPage/StartPage";
import "./App.css";
import { useState } from "react";
import Phase1 from "./pages/Phase1/Phase1";
import Phase2 from "./pages/Phase2/Phase2";
import startSession from "./api/startSession";
import createQuestionsPhase1 from "./utils/createQuestionsPhase1";
import createQuestionsPhase2 from "./utils/createQuestionsPhase2";
import EndScreen from "./pages/EndScreen/EndScreen";

function App() {
  const [questionsPhase1, setQuestionsPhase1] = useState([]);
  const [questionsPhase2, setQuestionsPhase2] = useState([]);
  const [screenID, setScreenID] = useState(0);

  const nextScreen = () => setScreenID((cur) => cur + 1);

  const startSessionSubmit = async (code) => {
    try {
      const { session, wordsPhase1, wordsPhase2 } = await startSession(code);
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
    } catch {
      alert("שגיאה. אנא וודאו הקוד שקיבלתם נכון.");
    }
  };

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
