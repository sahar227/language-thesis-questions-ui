import React, { useState } from "react";
import Phase2QuestionsManager from "../../components/Phase2QuestionsManager/Phase2QuestionsManager";
import practiceQuestionsPhase2 from "../../staticData/practiceQuestionsPhase2";

export default function Phase2({ questions, nextScreen }) {
  const [isPractice, setIsPractice] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [instructionsSlideNumber, setInstructionsSlideNumber] = useState(0);
  const [isPracticeOverScreenShown, setIsPracticeOverScreenShown] =
    useState(false);

  if (!isStarted && instructionsSlideNumber === 0) {
    return (
      <div>
        <p>
          במטלה זו תאזינו למילים לא מוכרות בשפה זרה. עבור כל מילה שתשמעו, יופיע
          במסך תרגום מסוים.
        </p>
        <p>
          אם התרגום נכון עליכם להשיב "כן" ואם התרגום שגוי עליכם להשיב "לא".{" "}
        </p>
        <br />
        <p>לחצו על חץ ימיני במקלדת אם התשובה היא כן.</p>
        <p>לחצו על חץ שמאלי במקלדת עם התשובה היא לא. </p>
        <br />
        <p>אחרי כל תשובה שתשיבו המחשב יאמר האם נכונה או לא נכונה.</p>
        <p style={{ fontWeight: "bold" }}>
          לאורך השלב המילים יחזרו על עצמן מספר פעמים.
        </p>
        <p style={{ fontWeight: "bold" }}>
          {" "}
          עליכם להשתמש בפידבק שניתן כדי ללמוד כמה שיותר מילים.
        </p>
        <button onClick={() => setInstructionsSlideNumber(1)}>המשך</button>
      </div>
    );
  }

  if (!isStarted && instructionsSlideNumber === 1) {
    return (
      <div>
        <h1 style={{ fontSize: "80px" }}>תרגול:</h1>
        <p style={{ fontSize: "20px" }}>
          כעת יוצג בפניכם תרגול קצר כדי לוודא הבנה.
        </p>
        <p>לחצו כדי להתחיל את התרגול.</p>
        <button
          onClick={() => {
            setIsPractice(true);
            setIsStarted(true);
          }}
        >
          התחל תרגול
        </button>
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
      {!isPracticeOverScreenShown && !isPractice && (
        <>
          <p>עבודה טובה! כדי להתחיל את המבחן לחצו על כפתור המשך.</p>
          <button onClick={() => setIsPracticeOverScreenShown(true)}>
            המשך
          </button>
        </>
      )}
      {!isPractice && isPracticeOverScreenShown && (
        <Phase2QuestionsManager blocks={questions} nextScreen={nextScreen} />
      )}
    </div>
  );
}
