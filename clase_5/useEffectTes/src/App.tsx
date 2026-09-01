import { useCallback, useEffect, useMemo, useState } from "react";
import { PersistentInput } from "./Persistencia";

function Timer() {
  const [second, setSeconds] = useState(0);
  // Caso 1: sin [] se ejecuta cada vez que hay un cambio en el componente
  // Caso 2:con el [] vacio se ejecuta una sola vez cuando se inicia el componente
  // Caso 3: dentro del [] le agregamos dependencias.

  // no tienen como limpiarlo de forma automatica si no estas fuera del useEffect
  // setInterval(() => {
  //   setSeconds((s) => s + 1);
  //   console.log("hola");
  // }, 1000);

  useEffect(() => {
    // conexion con una db
    console.log("se monta el useEffect");

    const event = setInterval(() => {
      setSeconds((s) => s + 1);
      console.log("hola");
    }, 1000);

    return () => {
      clearInterval(event);
      // clearTimeout
      console.log("se desmonta el useEffect");
    };
  }, []);

  return <>hola timer {second}</>;
}

function App() {
  const [show, setShow] = useState(true);
  const [contador, setContador] = useState(0);

  // ! loop infinito
  // const [data, setData] = useState("");

  // let miValor = [1, 2, 3, 4, 5, 6];

  // const menoresCinco = useMemo(()=>miValor.filter((n) => n < 5), [miValor])

  // contador vale 0  se crea prueba
  // contador vale 1 se crea otra vez prueba
  // const prueba = useCallback (() => {
  //   // hace muchas cosas
  //   console.log('lo que sea');
  // }, [])

  // prueba()

  // useMemo(() => {
  //   let otroValor = 20;
  //   setContador(miValor + otroValor);
  // }, []);

  return (
    <div>
      <button onClick={() => setShow((s) => !s)}>
        {show ? "Desmontar" : "Montar"}
      </button>
      {/* {show && <Timer />} */}
      <PersistentInput />

      <p> el memo {contador}</p>
      {}
    </div>
  );
}
export default App;
