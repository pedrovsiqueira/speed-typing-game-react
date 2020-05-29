import React, { useState, useEffect, useRef } from "react";

function App() {
  const STARTING_TIME = 10;
  const [textTyped, setTextTyped] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [gameStart, setGameStart] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const inputRef = useRef(null);

  const handleChange = (event) => {
    const { value } = event.target;
    setTextTyped(value);
  };

  const blockPaste = (event) => {
    event.target.addEventListener("paste", (e) => {
      e.preventDefault();
      return false;
    });
  }

  const calculateWordCount = (textTyped) => {
    const wordsArr = textTyped.trim().split(" ");
    return wordsArr.filter((word) => word !== "").length;
  };

  const startGame = () => {
    setGameStart(true);
    setTimeRemaining(STARTING_TIME);
    setTextTyped("");
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  const endGame = () => {
    setGameStart(false);
    setWordCount(calculateWordCount(textTyped));
  };

  useEffect(() => {
    if (timeRemaining > 0 && gameStart) {
      setWordCount(0);
      setTimeout(() => {
        setTimeRemaining((prevState) => prevState - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      endGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStart, timeRemaining]);

  return (
    <div className="App">
      <h1>Speed typing game</h1>
      <textarea
        ref={inputRef}
        disabled={!gameStart}
        onChange={handleChange}
        value={textTyped}
        onFocus={blockPaste}
      />
      <h4>Time Remaining: {timeRemaining}</h4>
      <button disabled={gameStart} onClick={startGame}>
        Start
      </button>
      <h4>Word Count: {wordCount}</h4>
    </div>
  );
}

export default App;
