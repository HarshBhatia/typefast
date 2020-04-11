import React, { useState, useEffect } from "react";

import words from "./words";
import wordArray from "./words";

const generateRandomParagraph = (array) => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array.slice(0, 100);
};

function App() {
  const [userInput, setUserInput] = useState("");
  const [testComplete, setTestComplete] = useState(false);
  const [arrayPara, setArrayPara] = useState([""]);
  const [wordIndex, setWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(60);
  const [CD, setCD] = useState(null);

  const handleChange = (e) => {
    setUserInput(e.target.value);
    if (userInput.endsWith(" ")) {
      console.log("space pressed");
      if (userInput.trim() == arrayPara[wordIndex]) {
        setScore(score + 1);
      } else {
        console.log("mistake");
      }
      setWordIndex(wordIndex + 1);
      setUserInput("");
      console.log(wordIndex);
    }
  };

  const handleClick = () => {
    setCD(setInterval(() => setTime((time) => time - 1), 1000));
    setArrayPara(generateRandomParagraph(wordArray));
  };

  useEffect(() => {
    if (time == 0) {
      clearInterval(CD);
      setTestComplete(true)
    }
    console.log(time);
  }, [time]);

  return (
    <div>
      {!testComplete ? (
        <div className="testScreens">
          <h1>press space twice to move onto next word</h1>
          <button onClick={handleClick}>Take test</button>
          <div className="timerDisplay">{time}</div>
          <div className="testParagraph">
            {arrayPara.map((w, i) => (
              <span
                style={{
                  backgroundColor: wordIndex == i ? "yellow" : "transparent",
                }}
              >
                {w + " "}
              </span>
            ))}
            <p> {score} </p>
          </div>
          <input
            className="userInput"
            value={userInput}
            onChange={handleChange}
          ></input>
        </div>
      ) : (
        <div className="resultScreen">
          <div className="results">{score}</div>
        </div>
      )}
    </div>
  );
}

export default App;
