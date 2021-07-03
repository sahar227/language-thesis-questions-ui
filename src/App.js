import StartPage from "./pages/StartPage/StartPage";
import "./App.css";
import { useState } from "react";
import Phase1 from "./pages/Phase1/Phase1";
import startSession from "./api/startSession";
import createQuestionsPhase1 from "./utils/createQuestionsPhase1";
import createQuestionsPhase2 from "./utils/createQuestionsPhase2";

function App() {
  const [questionsPhase1, setQuestionsPhase1] = useState([]);
  const [questionsPhase2, setQuestionsPhase2] = useState([]);
  const [screenID, setScreenID] = useState(2); // TODO: Change back to zero
  const [questionReport, setQuestionReport] = useState([]);

  const nextScreen = () => setScreenID((cur) => cur + 1);

  const addReportForQuestion = (report) =>
    setQuestionReport((cur) => [...cur, report]);

  const startSessionSubmit = async (code) => {
    const { session, wordsPhase1, wordsPhase2 } = await startSession(code);
    const questionsPhase1 = createQuestionsPhase1(wordsPhase1);
    setQuestionsPhase1(questionsPhase1);
    const questionsPhase2 = createQuestionsPhase2(wordsPhase2);
    setQuestionsPhase2(questionsPhase2);
    nextScreen();
  };

  // const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="container">
      {screenID === 0 && <StartPage startSessionSubmit={startSessionSubmit} />}
      {screenID === 1 && (
        <Phase1
          addReportForQuestion={addReportForQuestion}
          questions={questionsPhase1}
          nextScreen={nextScreen}
        />
      )}
      {screenID === 2 && <p>phase 2!</p>}
    </div>
  );
}

export default App;
