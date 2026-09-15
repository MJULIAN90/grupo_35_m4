// Esto es solo parte de aprendizaje para ver como se construye un context de react

import { createContext, useContext, type ReactNode } from "react";

interface TipadoPruebaContexto {
  data: number[];
  myName: string;
}

const PruebaContexto = createContext<null | TipadoPruebaContexto>(null);

export function PruebaContextoNuevo({ children }: { children: ReactNode }) {
  const data = [1, 2, 3];
  const myName = "julian perez";

  const value: TipadoPruebaContexto = {
    data,
    myName,
  };

  return (
    <PruebaContexto.Provider value={value}>
      {children}
      {/* <App /> */}
    </PruebaContexto.Provider>
  );
}

export const ConstumirContext = () => {
  const {myName} = useContext(PruebaContexto);

  console.log("vamos a ver el contexto = ", myName);

  return <>{myName}</>;
};
