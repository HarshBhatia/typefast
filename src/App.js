import React, { useState, useEffect, useRef } from "react";

import words from "./words";

function App() {
  React.useEffect(() => {
    setParagraph(generateRandomParagraph(100));
  }, []);
  const [start, setStart] = React.useState(false);
  const [time, setTime] = React.useState(60);
  const [paragraph, setParagraph] = useState([]);
  const [score, setScore] = useState(0);
  const [activeWord, setActiveWord] = useState(0);
  const [word, setWord] = useState("");
  const [timer, setTimer] = useState(null);
  const [testComplete, setTestComplete] = React.useState(false);

  useEffect(() => {
    console.log(time);
    if (time === 0) {
      clearInterval(timer);
      setTestComplete(true);
    }
  }, [time]);
  const startTest = () => {
    setStart(true);
    setTimer(setInterval(() => setTime((time) => time - 1), 1000));
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value[value.length - 1] === " ") {
      if (paragraph[activeWord] === e.target.value.slice(0, -1)) {
        setScore(score + 1);
      }
      setActiveWord(activeWord + 1);

      setWord("");
    } else {
      setWord(e.target.value);
    }
  };

  if (start) {
    return (
      <div style={styles.container}>
        {!testComplete ? (
          <div className="testScreens">
            <div className="timerDisplay">
              <h2>Timer</h2>
              <p>{time === 60 ? "1:00" : "00:" + time}</p>
            </div>
            <div className="testParagraph">
              <h2>Paragraph</h2>
              {paragraph.map((item, index) => {
                if (activeWord == index) {
                  return <strong>{item + " "}</strong>;
                } else return item + " ";
              })}
            </div>

            <br />
            <br />
            <h2>Enter Word</h2>
            <input
              value={word}
              className="userInput"
              onChange={handleInputChange}
            />
          </div>
        ) : (
          <div className="resultScreen">
            <div className="results">
              <h2>Score</h2>
              <p>
                {score}/{paragraph.length}
              </p>
            </div>
            <button
              style={styles.button}
              onClick={() => {
                setTime(60);
                setStart(false);
              }}
            >
              Take test again
            </button>
          </div>
        )}
      </div>
    );
  }
  return (
    <div style={styles.container}>
      <button
        onClick={() => {
          startTest();
        }}
        style={styles.button}
      >
        Take Test
      </button>
    </div>
  );
}
const styles = {
  container: {
    diplay: "flex",
    justifyContent: "center",
    alignText: "center",
    flexDirection: "column",
    margin: 100,
  },
  button: {
    border: "none",
    backgroundColor: "orange",
    color: "white",
  },
};
export default App;
const generateRandomParagraph = (len) => {
  let ctr = words.length;
  let temp;
  let index;

  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
    ctr--;
    // And swap the last element with it
    temp = words[ctr];
    words[ctr] = words[index];
    words[index] = temp;
  }
  return words.slice(0, len);
};
