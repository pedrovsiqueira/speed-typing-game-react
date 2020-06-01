import React, { useState, useEffect, useRef } from "react";
import useWordGame from "./hooks/useWordGame";

function App() {
  const {
    inputRef,
    gameStart,
    handleChange,
    textTyped,
    blockPaste,
    timeRemaining,
    wordCount,
    highScore,
    startGame,
  } = useWordGame;
  
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
