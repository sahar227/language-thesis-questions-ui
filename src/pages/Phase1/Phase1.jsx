import React from "react";
import Phase1QuestionsManager from "../../components/Phase1QuestionsManager/Phase1QuestionsManager";

export default function Phase1({
  questions,
  addReportForQuestion,
  nextScreen,
}) {
  return (
    <div>
      <h1>שלב ראשון</h1>
      <Phase1QuestionsManager
        questions={questions}
        addReportForQuestion={addReportForQuestion}
        nextScreen={nextScreen}
      />
    </div>
  );
}
