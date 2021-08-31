import React, { useState } from "react";
import Phase1QuestionsManager from "../../components/Phase1QuestionsManager/Phase1QuestionsManager";
import practiceQuestionsPhase1 from "../../staticData/practiceQuestionsPhase1";

export default function Phase1({
  questions,
  addReportForQuestion,
  nextScreen,
}) {
  const [isPractice, setIsPractice] = useState(true);
  return (
    <div>
      {isPractice && (
        <>
          <h1>תרגול!</h1>
          <Phase1QuestionsManager
            questions={practiceQuestionsPhase1}
            addReportForQuestion={addReportForQuestion}
            nextScreen={() => setIsPractice(false)}
            isPractice
          />
        </>
      )}
      {!isPractice && (
        <Phase1QuestionsManager
          questions={questions}
          addReportForQuestion={addReportForQuestion}
          nextScreen={nextScreen}
        />
      )}
    </div>
  );
}
