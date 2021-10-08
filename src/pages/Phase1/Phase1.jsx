import React, { useState } from "react";
import Phase1QuestionsManager from "../../components/Phase1QuestionsManager/Phase1QuestionsManager";
import practiceQuestionsPhase1 from "../../staticData/practiceQuestionsPhase1";

export default function Phase1({ questions, nextScreen }) {
  const [isPractice, setIsPractice] = useState(true);
  const [isStarted, setIsStarted] = useState(false);

  if (!isStarted) {
    return (
      <div>
        <p>למטלה זו תוצג בפניכם אות ולאחר מכן מילה בשפה זרה.</p>
        <p>
          אם האות מופיעה במילה תציינו כן ואם האות לא מופיעה במילה תציינו לא.
        </p>
        <p>עלייך להשיב בצורה המדויקת והמהירה ביותר.</p>
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
