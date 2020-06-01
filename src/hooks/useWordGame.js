import { useState, useEffect, useRef } from "react";

const useWordGame = (startingTime = 3) => {
  const [textTyped, setTextTyped] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(startingTime);
  const [gameStart, setGameStart] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  var localHighScore = localStorage.getItem("Highscore");
  const [highScore, setHighScore] = useState(localHighScore);

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
    setTimeRemaining(startingTime);
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
    localStorage.setItem("Highscore", JSON.stringify(highScore));
  }, [highScore]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    localHighScore = localStorage.getItem("Highscore");
    setHighScore(JSON.parse(localHighScore));
  }, []);

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

  return {
    inputRef,
    gameStart,
    handleChange,
    textTyped,
    blockPaste,
    timeRemaining,
    wordCount,
    highScore,
    startGame,
  };
};

export default useWordGame;
