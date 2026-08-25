import "./App.css";
import Formulario from "./components/Formulario";
import Button from "./components/Button";
import { useState } from "react";

function App() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <Formulario>
        <Button
          onPress={() => {
            setNumber((prev) => prev + 1);
            console.log("hola soy el boton");
          }}
          title="soy el boton"
          isOdd={number % 2 ? true : false}
        />
      </Formulario>
    </>
  );
}

export default App;
