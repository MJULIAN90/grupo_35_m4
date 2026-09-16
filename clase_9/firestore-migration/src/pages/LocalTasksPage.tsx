import { useEffect, useMemo, useState } from "react";

import type { LocalTask } from "../services/taskServiceLocal";
import {
  addTask,
  deleteTask,
  getOrderByCreatedAt,
  getTasksByUser,
} from "../services/taskServiceLocal";

type Props = {
  uid: string | null; // simula el userId, igual que en Firestore
};

export function LocalTasksPage({ uid }: Props) {
  const [tasks, setTasks] = useState<LocalTask[]>([]);
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
      } catch {
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

      setTitle("");
      setTasks((prev) => [created, ...prev]);
    } catch {
      setError("No se pudo crear la tarea.");
    } finally {
      setLoading(false);
    }
  }

  async function getByOrder() {
    try {
      setLoading(true);
      setError(null);
      setTasks([]);

      if (!uid) {
        setError("Necesitás iniciar sesión para ver tus tareas.");
        return;
      }

      const response = await getOrderByCreatedAt(uid);

      setTasks(response);
    } catch {
      setError("No se pudieron cargar las tareas.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteTask(taskId: string): Promise<void> {
    try {
      setLoading(true);
      setError(null);
      await deleteTask(taskId);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId)
      );
    } catch (error) {
      console.error("No se pudo eliminar la tarea", error);
      setError("No se pudo eliminar la tarea.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 16 }}>
      <h1>Mis tareas (localStorage)</h1>
      <p>
        Los datos se persisten en el navegador con{" "}
        <code>localStorage</code>. Abrí DevTools → Application → Local Storage
        para verlos.
      </p>

      {!uid && <p>Iniciá sesión para ver tus tareas.</p>}

      <form onSubmit={handleAddTask} style={{ display: "flex", gap: 8, marginTop: 12 }}>
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

      <section>
        <button onClick={getByOrder}> Mostrar lista ordenada</button>
      </section>

      {error && (
        <p role="alert" style={{ color: "crimson", marginTop: 12 }}>
          {error}
        </p>
      )}

      {loading && tasks.length === 0 && <p>Cargando tareas...</p>}

      {!loading && !error && tasks.length === 0 && uid && <p>No tenés tareas todavía.</p>}

      <ul style={{ marginTop: 16 }}>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title} <small style={{ opacity: 0.7 }}>(owner: {t.userId})</small>
            <button onClick={() => handleDeleteTask(t.id)}> delete </button>
          </li>
        ))}
      </ul>
    </main>
  );
}