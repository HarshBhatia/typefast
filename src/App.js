import React, { useState, useEffect } from "react";

import commonWords from "./words";

function App() {
  const [testComplete, setTestComplete] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [active, setActive] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(false);

  const [testarray, setTestarray] = useState(generateRandomParagraph());

  const useTimer = (length, callback = () => {}) => {
    const [startTime, setStartTime] = useState(new Date());
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
      if (elapsed >= length) {
        return;
      }

      const interval = setInterval(() => {
        const newElapsed = Math.round((new Date() - startTime) / 1000);

        if (newElapsed > elapsed) {
          setElapsed(newElapsed);

          if (newElapsed >= length) {
            callback();
          }
        }
      }, 250);

      return () => clearInterval(interval);
    });

    const restart = () => {
      setStartTime(new Date());
      setElapsed(0);
    };

    return [elapsed, restart];
  };

  const elapsed = useTimer(60);

  const setTimer = () => {
    if (time) {
      return;
    }
    let a = setTime(true);
    setTimeout(function () {
      setTestComplete(true);
    }, 60000);
    console.log("hello");
  };

  const handleMatch = (e) => {
    setTimer();
    if (e.target.value[e.target.value.length - 1] == " ") {
      setUserInput("");
      console.log(time);
      setActive((prev) => {
        return prev + 1;
      });
      if (userInput == testarray[active]) {
        setScore((prev) => {
          return prev + 1;
        });
      } else {
        console.log("wrong");

        setScore(score);
      }
    } else {
      setUserInput(e.target.value);
    }
  };

  return (
    <div>
      {!testComplete ? (
        <div className="testScreens">
          <div className="timerDisplay">
            <span>{elapsed} / 60</span>
          </div>
          <div className="testParagraph">{testarray}</div>
          <input
            className="userInput"
            value={userInput}
            onChange={handleMatch}
          ></input>
        </div>
      ) : (
        <div className="resultScreen">
          <div className="results">final result:{score}</div>
          <button onChange={window.location.reload()}>Take test again</button>
        </div>
      )}
    </div>
  );
}

const generateRandomParagraph = (len) => {
  //Maybe generate a 200 word paragraph from words array
  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, 200);
  };
  return shuffle(commonWords);
};

export default App;
