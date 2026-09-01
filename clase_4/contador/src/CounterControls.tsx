interface CounterControlsProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min: number;
  max: number;
}

function CounterControls({
  count,
  onIncrement,
  onDecrement,
  min,
  max,
}: CounterControlsProps) {
  const handleIncrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Increment button clicked at", event.clientX, event.clientY);
    onIncrement();
  };

  const handleDecrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Decrement button clicked at", event.clientX, event.clientY);
    onDecrement();
  };
  return (
    <div className="controls">
      <h2>valor de counter {count}</h2>
      <button onClick={handleDecrement} disabled={count <= min}>
        Decrement
      </button>
      <button onClick={handleIncrement} disabled={count >= max}>
        Increment
      </button>
    </div>
  );
}

export default CounterControls;
