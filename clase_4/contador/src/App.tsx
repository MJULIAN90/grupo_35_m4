import { useState } from "react";
import "./App.css";
import CounterControls from "./CounterControls";
import CounterStatus from "./CounterStatus";

const MIN_COUNT = -5;
const MAX_COUNT = 5;

function App() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prevCount) => {
      if (prevCount < MAX_COUNT) {
        return prevCount + 1;
      }
      return prevCount;
    });
  };

  const handleDecrement = () => {
    setCount((prevCount) => {
      if (prevCount > MIN_COUNT) {
        return prevCount - 1;
      }
      return prevCount;
    });
  };

  return (
    <div className="app">
      <h1>Counter App</h1>
      <div className="counter-display">
        <p>Current count: {count}</p>
      </div>
      <CounterControls
        count={count}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        min={MIN_COUNT}
        max={MAX_COUNT}
      />
      <CounterStatus count={count} />
    </div>
  );
}

export default App;
