import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Authenticator } from "./feactures/auth/Authenticator.tsx";
import { PruebaContextoNuevo } from "./feactures/auth/pruebaConxtexto.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <PruebaContextoNuevo>
        <Authenticator>
          <App />
        </Authenticator>
      </PruebaContextoNuevo>
    </BrowserRouter>
  </StrictMode>,
);
