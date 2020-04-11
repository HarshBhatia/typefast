import React from "react";

import words from "./words";

function App() {
  const [testComplete, setTestComplete] = useState(false);
  return (
    <div>
      {!testComplete ? (
        <div className="testScreens">
          <div className="timerDisplay"></div>
          <div className="testParagraph"></div>
          <input className="userInput"></input>
        </div>
      ) : (
        <div className="resultScreen">
          <div className="results"></div>
          <button>Take test again</button>
        </div>
      )}
    </div>
  );
}

const generateRandomParagraph = (len) => {
  //Maybe generate a 200 word paragraph from words array
};

export default App;
