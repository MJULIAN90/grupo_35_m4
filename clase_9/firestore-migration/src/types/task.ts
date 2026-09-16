import type { Timestamp } from "firebase/firestore";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
  createdAt?: Timestamp; // opcional: serverTimestamp() llega como Timestamp al leer
};

export type NewTaskInput = {
  title: string;
  userId: string;
};
