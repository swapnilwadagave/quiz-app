import React, { useState } from "react";

const QuestionBox = ({ question, options,selectedAnswer }) => {
  const [answer, setAnswer] = useState(options);
  return (
    <div className="questionBox">
      <div className="question"> {question}</div>
      {answer.length > 0 &&
        answer.map((text, index) => (
          <button
            key={index}
            className="answerBtn"
            onClick={() => {
              setAnswer([text]);
              selectedAnswer(text);
            }}
          >
            {text}
          </button>
        ))}
    </div>
  );
};

export default QuestionBox;
