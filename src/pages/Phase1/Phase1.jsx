import React from "react";
import Phase1QuestionsManager from "../../components/Phase1QuestionsManager/Phase1QuestionsManager";

export default function Phase1({
  questions,
  addReportForQuestion,
  nextScreen,
}) {
  return (
    <div>
      <Phase1QuestionsManager
        questions={questions}
        addReportForQuestion={addReportForQuestion}
        nextScreen={nextScreen}
      />
    </div>
  );
}
