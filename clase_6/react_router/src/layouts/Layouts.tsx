import { Link, Outlet } from "react-router-dom";
import type { JSX } from "react";

interface LayoutProps {
  isAuthenticated: boolean;
  onToggleAuth: () => void;
}

function Layout({ isAuthenticated, onToggleAuth }: LayoutProps): JSX.Element {
  return (
    <div
      style={{
        backgroundColor: "yellowgreen",
      }}
    >
      <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <Link to="/">Inicio</Link>
        {" | "}
        <Link to="/about">Acerca de</Link>
        {" | "}
        <Link to="/contact">Contacto</Link>
        {" | "}
        <Link to="/user/Ana">Ana</Link>
        {" | "}
        <Link to="/user/Carlos">Carlos</Link>
        {" | "}
        <button onClick={onToggleAuth}>
          {isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}
        </button>
      </nav>
      <main style={{ padding: "1rem", backgroundColor: "blue" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
