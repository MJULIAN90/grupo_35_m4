import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
  type DocumentData,
} from "firebase/firestore";

import { db } from "../config/firebase.config";
import type { NewTaskInput, Task } from "../types/task";

type TaskFirestoreDoc = Omit<Task, "id">;

function mapTask(docId: string, data: DocumentData): Task {
  const typed = data as TaskFirestoreDoc;

  return {
    id: docId,
    title: typed.title,
    completed: typed.completed,
    userId: typed.userId,
    createdAt: typed.createdAt,
  };
}

export async function getTasksByUser(userId: string): Promise<Task[]> {
  // Regla mental: si tus rules exigen ownership por userId,
  // esta query NO es opcional. Sin esto, suele fallar por permisos.
  const q = query(collection(db, "tasks"), where("userId", "==", userId));

  const snapshot = await getDocs(q);

  console.log("datos de firestore", snapshot);

  // Nota: Firestore no garantiza orden si no usás orderBy.
  // Para este hands-on, priorizamos claridad: query mínima.
  // Si luego agregás orderBy(createdAt), podés necesitar índice compuesto.
  return snapshot.docs.map((d) => mapTask(d.id, d.data()));
}

export async function addTask(input: NewTaskInput): Promise<Task> {
  const payload: Omit<Task, "id"> = {
    title: input.title,
    completed: false,
    userId: input.userId,
    // FieldValue -> import type { Timestamp, FieldValue } from "firebase/firestore"
    createdAt: serverTimestamp() as unknown as Task["createdAt"],
  };

  const docRef = await addDoc(collection(db, "tasks"), payload);

  // Importante para UX: devolvemos un Task ya con id
  // para poder actualizar el estado local sin re-fetch inmediato.
  return {
    id: docRef.id,
    ...payload,
  };
}
