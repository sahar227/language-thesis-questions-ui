import React, { useState } from "react";
import startSession from "../../api/startSession";
import createQuestionsPhase1 from "../../utils/createQuestionsPhase1";

const codeExpectedLength = 24;

export default function StartPage({ setQuestions }) {
  const [code, setCode] = useState("");
  const isButtonDisabled = code.length !== codeExpectedLength;

  const onSubmit = async () => {
    const { session, wordsPhase1 } = await startSession(code);
    const questions = createQuestionsPhase1(wordsPhase1);
    setQuestions(questions);
  };

  return (
    <div>
      <h1>שלום!</h1>
      <p>בבקשה הדביקו את הקוד שקיבלתם בכדי להתחיל.</p>

      <input value={code} onChange={(e) => setCode(e.target.value)} />
      <button disabled={isButtonDisabled} onClick={onSubmit}>
        התחל
      </button>
      {code.length > 0 && code.length !== codeExpectedLength && (
        <p style={{ color: "red" }}>
          {`אורך הקוד צריך להיות ${codeExpectedLength} תווים`}
        </p>
      )}
    </div>
  );
}
