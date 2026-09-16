// Tipo propio del servicio, sin depender de firebase (Timestamp).
// createdAt es un string ISO.
export type LocalTask = {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
  createdAt: string;
};

export type NewLocalTaskInput = {
  title: string;
  userId: string;
};

const STORAGE_KEY = "local-tasks";

function readAllTasks(): LocalTask[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as LocalTask[];
  } catch {
    return [];
  }
}

function writeTasks(tasks: LocalTask[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// localStorage es un poco "sincrónico", pero exponemos las
// mismas firmas async para que el componente se use igual que Firestore.
export async function getTasksByUser(userId: string): Promise<LocalTask[]> {
  return readAllTasks().filter((t) => t.userId === userId);
}

export async function addTask(input: NewLocalTaskInput): Promise<LocalTask> {
  const task: LocalTask = {
    id: crypto.randomUUID(),
    title: input.title,
    completed: false,
    userId: input.userId,
    createdAt: new Date().toISOString(),
  };

  const all = readAllTasks();
  writeTasks([task, ...all]);

  return task;
}

export async function getOrderByCreatedAt(userId: string): Promise<LocalTask[]> {
  return readAllTasks()
    .filter((t) => t.userId === userId)
    .slice()
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function deleteTask(taskId: string): Promise<void> {
  const all = readAllTasks().filter((t) => t.id !== taskId);
  writeTasks(all);
}