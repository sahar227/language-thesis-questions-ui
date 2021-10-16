import React, { useState } from "react";
import Phase1QuestionsManager from "../../components/Phase1QuestionsManager/Phase1QuestionsManager";
import practiceQuestionsPhase1 from "../../staticData/practiceQuestionsPhase1";

export default function Phase1({ questions, nextScreen }) {
  const [isPractice, setIsPractice] = useState(true);
  const [isStarted, setIsStarted] = useState(false);

  // Start loading images and sounds here, if isStarted is true but we are still loading, show loading message

  if (!isStarted) {
    return (
      <div>
        <p>במטלה זו תוצג בפניכם אות ולאחר מכן מילה בשפה זרה.</p>
        <p>
          אם האות מופיעה במילה תציינו
          <span style={{ fontWeight: "bold" }}> כן </span>
          ואם האות לא מופיעה במילה תציינו
          <span style={{ fontWeight: "bold" }}> לא</span>.
        </p>
        <p>לחצו על חץ ימיני במקלדת אם התשובה היא כן.</p>
        <p>לחצו על חץ שמאלי במקלדת עם התשובה היא לא. </p>
        <p style={{ fontWeight: "bold" }}>
          עליכם להשיב בצורה המדויקת והמהירה ביותר.
        </p>
        <button onClick={() => setIsStarted(true)}>התחל</button>
      </div>
    );
  }

  return (
    <div>
      {isPractice && (
        <>
          <h1>תרגול!</h1>
          <Phase1QuestionsManager
            questions={practiceQuestionsPhase1}
            nextScreen={() => setIsPractice(false)}
            isPractice
          />
        </>
      )}
      {!isPractice && (
        <Phase1QuestionsManager questions={questions} nextScreen={nextScreen} />
      )}
    </div>
  );
}
