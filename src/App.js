import StartPage from "./pages/StartPage/StartPage";
import "./App.css";
import { useState } from "react";
import Phase1 from "./pages/Phase1/Phase1";

function App() {
  const [questions, setQuestions] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="container">
      {questions.length === 0 && <StartPage setQuestions={setQuestions} />}
      {questions.length !== 0 && <Phase1 questions={questions} />}
    </div>
  );
}

export default App;
