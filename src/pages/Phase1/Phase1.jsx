import React, { useState } from "react";
import Phase1QuestionsManager from "../../components/Phase1QuestionsManager/Phase1QuestionsManager";
import practiceQuestionsPhase1 from "../../staticData/practiceQuestionsPhase1";

export default function Phase1({ questions, nextScreen }) {
  const [isPractice, setIsPractice] = useState(true);
  const [instructionsSlideNumber, setInstructionsSlideNumber] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isPracticeOverScreenShown, setIsPracticeOverScreenShown] =
    useState(false);

  // Start loading images and sounds here, if isStarted is true but we are still loading, show loading message

  if (!isStarted && instructionsSlideNumber === 0) {
    return (
      <div>
        <p>במטלה זו תוצג בפניכם אות ולאחר מכן מילה בשפה זרה.</p>
        <p>
          אם האות מופיעה במילה תציינו
          <span style={{ fontWeight: "bold" }}> כן </span>
          ואם האות לא מופיעה במילה תציינו
          <span style={{ fontWeight: "bold" }}> לא</span>.
        </p>
        <br />
        <p>לחצו על חץ ימיני במקלדת אם התשובה היא כן.</p>
        <p>לחצו על חץ שמאלי במקלדת עם התשובה היא לא. </p>
        <p style={{ fontWeight: "bold" }}>
          עליכם להשיב בצורה המדויקת והמהירה ביותר.
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
          <Phase1QuestionsManager
            questions={practiceQuestionsPhase1}
            nextScreen={() => setIsPractice(false)}
            isPractice
          />
        </>
      )}
      {!isPracticeOverScreenShown && (
        <>
          <p>עבודה טובה! כדי להתחיל את המבחן לחצו על כפתור המשך.</p>
          <p style={{ fontWeight: "bold" }}>
            זכרו שעליכם להשיב בצורה המדויקת והמהירה ביותר.
          </p>
          <button onClick={() => setIsPracticeOverScreenShown(true)}>
            המשך
          </button>
        </>
      )}
      {!isPractice && isPracticeOverScreenShown && (
        <Phase1QuestionsManager questions={questions} nextScreen={nextScreen} />
      )}
    </div>
  );
}
