import React, { useState } from "react";
import Phase2QuestionsManager from "../../components/Phase2QuestionsManager/Phase2QuestionsManager";
import practiceQuestionsPhase2 from "../../staticData/practiceQuestionsPhase2";

export default function Phase2({ questions, nextScreen }) {
  const [isPractice, setIsPractice] = useState(true);
  const [isStarted, setIsStarted] = useState(false);

  if (!isStarted) {
    return (
      <div>
        <p>תודה על שיתוף הפעולה!</p>
        <p>
          כעת תאזינו למילים נוספות בשפה זרה. עבור כל מילה שתשמעו, יופיע במסך
          תרגום מסוים.
        </p>
        <p>
          אם התרגום נכון עליכם להשיב "כן" ואם התרגום שגוי עליכם להשיב "לא".{" "}
        </p>
        <br />
        <p>אחרי כל תשובה שתשיבו המחשב יאמר האם נכונה או לא נכונה.</p>
        <p> עליכם להשתמש במידע זה כדי ללמוד כמה שיותר מילים.</p>
        <button onClick={() => setIsStarted(true)}>התחל</button>
      </div>
    );
  }

  return (
    <div>
      {isPractice && (
        <>
          <h1>תרגול!</h1>
          <Phase2QuestionsManager
            blocks={practiceQuestionsPhase2}
            nextScreen={() => setIsPractice(false)}
            isPractice
          />
        </>
      )}
      {!isPractice && (
        <Phase2QuestionsManager blocks={questions} nextScreen={nextScreen} />
      )}
    </div>
  );
}
