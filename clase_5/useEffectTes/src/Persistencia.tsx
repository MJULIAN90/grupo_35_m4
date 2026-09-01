import { useState, useEffect } from "react";

export function PersistentInput() {
  const [name, setName] = useState("");

  // Efecto 1: leer al montar
  useEffect(() => {
    const saved = localStorage.getItem("name");
    if (saved) setName(saved);
  }, []);

  // Efecto 2: guardar cuando cambia
  useEffect(() => {
    localStorage.setItem("name", name);
    document.title = name ? `Hola, ${name}` : "Sin nombre";
  }, [name]);

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tu nombre..."
      />
      <p>{name ? `Hola, ${name}` : "Escribí tu nombre"}</p>
    </div>
  );
}
