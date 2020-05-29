import React, { useState } from "react";

function App() {
  const [textTyped, setTextTyped] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setTextTyped(value);
  };

  console.log(textTyped)

  return (
    <div className="App">
      <h1>Speed typing game</h1>
      <textarea onChange={handleChange} value={textTyped}/>
      <h4>Time Remaining</h4>
      <button>Start</button>
      <h1>Word Count</h1>
    </div>
  );
}

export default App;
