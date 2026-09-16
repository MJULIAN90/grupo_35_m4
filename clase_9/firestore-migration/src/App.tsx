import { useState } from "react";
import "./App.css";
import { TasksPage } from "./pages/TasksPage";
import { LocalTasksPage } from "./pages/LocalTasksPage";

function App() {
  const [mode, setMode] = useState<"firestore" | "local">("firestore");

  return (
    <>
      <nav style={{ display: "flex", gap: 8, padding: 16 }}>
        <button onClick={() => setMode("firestore")}>Firestore</button>
        <button onClick={() => setMode("local")}>localStorage</button>
      </nav>

      {mode === "firestore" ? (
        <TasksPage uid="10" />
      ) : (
        <LocalTasksPage uid="10" />
      )}
    </>
  );
}

export default App;
