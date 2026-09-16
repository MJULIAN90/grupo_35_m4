import { useCallback, useEffect, useMemo, useState } from "react";
import type { Task } from "../types/task";
import { addTask, getTasksByUser } from "../services/taskService";

type Props = {
  uid: string | null; // viene de tu Auth layer
};

export function TasksPage({ uid }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return Boolean(uid) && title.trim().length > 0 && !loading;
  }, [uid, title, loading]);

  useEffect(() => {
    if (!uid) {
      setTasks([]);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getTasksByUser(uid);
        if (!cancelled) setTasks(data);
      } catch (e) {
        // En un producto real, acá loguearías e, o lo mapearías.
        if (!cancelled) setError("No se pudieron cargar las tareas.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [uid]);

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault();

    if (!uid) {
      setError("Necesitás iniciar sesión para crear tareas.");
      return;
    }

    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    try {
      setLoading(true);
      setError(null);

      const created = await addTask({ title: cleanTitle, userId: uid });

      // UX: limpiar input inmediatamente
      setTitle("");

      // UX: actualizar lista local sin esperar otro fetch
      // (en este hands-on lo hacemos simple: prepend)
      setTasks((prev) => [created, ...prev]);
    } catch (e: unknown) {
      // Debug de error típico
      const message = e instanceof Error ? e.message : "Unknown error";

      if (
        message.toLowerCase().includes("permission") ||
        message.toLowerCase().includes("insufficient")
      ) {
        setError(
          "Permisos insuficientes (permission-denied). Revisá Firestore Rules y asegurate de estar filtrando por userId en la query.",
        );
        return;
      }

      setError("No se pudo crear la tarea.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 16 }}>
      <h1>Mis tareas</h1>

      {!uid && (
        <p>
          Iniciá sesión para ver tus tareas. (En un producto real, esto sería
          una ruta protegida.)
        </p>
      )}

      <form
        onSubmit={handleAddTask}
        style={{ display: "flex", gap: 8, marginTop: 12 }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nueva tarea..."
          aria-label="Nueva tarea"
        />
        <button type="submit" disabled={!canSubmit}>
          {loading ? "Guardando..." : "Agregar"}
        </button>
      </form>

      {error && (
        <p role="alert" style={{ color: "crimson", marginTop: 12 }}>
          {error}
        </p>
      )}

      {loading && tasks.length === 0 && <p>Cargando tareas...</p>}

      {!loading && !error && tasks.length === 0 && uid && (
        <p>No tenés tareas todavía.</p>
      )}

      <ul style={{ marginTop: 16 }}>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title}{" "}
            <small style={{ opacity: 0.7 }}>(owner: {t.userId})</small>
          </li>
        ))}
      </ul>
    </main>
  );
}
