import React, { useState } from "react";
import Phase2QuestionsManager from "../../components/Phase2QuestionsManager/Phase2QuestionsManager";
import practiceQuestionsPhase2 from "../../staticData/practiceQuestionsPhase2";

export default function Phase2({
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
          <Phase2QuestionsManager
            questions={practiceQuestionsPhase2}
            addReportForQuestion={addReportForQuestion}
            nextScreen={() => setIsPractice(false)}
            isPractice
          />
        </>
      )}
      {!isPractice && (
        <Phase2QuestionsManager
          questions={questions}
          addReportForQuestion={addReportForQuestion}
          nextScreen={nextScreen}
        />
      )}
    </div>
  );
}
