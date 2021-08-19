import React from "react";
import Phase2QuestionsManager from "../../components/Phase2QuestionsManager/Phase2QuestionsManager";
export default function Phase2({
  questions,
  addReportForQuestion,
  nextScreen,
}) {
  return (
    <div>
      <Phase2QuestionsManager
        questions={questions}
        addReportForQuestion={addReportForQuestion}
        nextScreen={nextScreen}
      />
    </div>
  );
}
