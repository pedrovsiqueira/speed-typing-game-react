import React, { useState, useEffect, useRef } from "react";

function App() {
  const STARTING_TIME = 5;
  const [textTyped, setTextTyped] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [gameStart, setGameStart] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [highScore, setHighScore] = useState(0);

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
  };

  const calculateWordCount = (textTyped) => {
    const wordsArr = textTyped.trim().split(" ");
    return wordsArr.filter((word) => word !== "").length;
  };

  const calculateHighScore = () => {
    if (wordCount > highScore) {
      setHighScore(wordCount);
    }
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
    calculateHighScore();
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
      <h4>Word Count: {wordCount}</h4>
      <h4>Highscore: {highScore}</h4>
      <button disabled={gameStart} onClick={startGame}>
        Start
      </button>
    </div>
  );
}

export default App;
