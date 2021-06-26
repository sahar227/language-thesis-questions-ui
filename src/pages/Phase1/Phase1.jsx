import React from "react";

export default function Phase1({ questions }) {
  return (
    <div>
      <h1>שלב ראשון</h1>
      <pre style={{ whiteSpace: "break-spaces" }}>
        {JSON.stringify(questions)}
      </pre>
    </div>
  );
}
