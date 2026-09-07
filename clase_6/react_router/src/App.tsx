import { useState, type JSX } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./layouts/Layouts";
import ProtectedRoute from "./components/ProtectedRoute";

import { useParams } from "react-router-dom";

function UserProfile(): JSX.Element {
  // useParams lee los valores dinámicos definidos en el path con :
  const { username } = useParams();

  return <h2>Perfil de: {username}</h2>;
}

function Home(): JSX.Element {
  // Cuando usamos este hook?
  const navigate = useNavigate();

  const handleGoToAbout = (): void => {
    // Navegación desde código, sin que el usuario haga clic en un Link
    navigate("/about");
  };

  return (
    <div>
      <h2>Inicio — Página pública</h2>
      <button onClick={handleGoToAbout}>Ir a Acerca de</button>
    </div>
  );
}

function About() {
  return <h2>Acerca de</h2>;
}
function Contact() {
  return <h2>Contact</h2>;
}
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <div
      style={{
        backgroundColor: "red",
      }}
    >
      <Routes>
        <Route
          element={
            <Layout
              isAuthenticated={isAuthenticated}
              onToggleAuth={() => setIsAuthenticated((prev) => !prev)}
            />
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/contact"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Contact />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/user/:username"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
