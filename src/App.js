import React, { useState, useEffect } from "react";

function App() {
  const [textTyped, setTextTyped] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [gameStart, setGameStart] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;
    setTextTyped(value);
  };

  const calculateWordCount = (textTyped) => {
    const wordsArr = textTyped.trim().split(" ");
    return wordsArr.filter((word) => word !== "").length;
  };

  useEffect(() => {
    if (timeRemaining > 0 && gameStart) {
      setTimeout(() => {
        setTimeRemaining((prevState) => prevState - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setGameStart(false);
      calculateWordCount(textTyped);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStart, timeRemaining]);

  return (
    <div className="App">
      <h1>Speed typing game</h1>
      <textarea onChange={handleChange} value={textTyped} />
      <h4>Time Remaining: {timeRemaining}</h4>
      <button onClick={() => setGameStart(true)}>Start</button>
      <h4>Word Count: {calculateWordCount(textTyped)}</h4>
    </div>
  );
}

export default App;
