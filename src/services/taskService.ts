import { Task } from "@/context/TaskContext";

const STORAGE_KEY = "tasks";

export const getTasks = (): Task[] => {
  if (typeof window !== "undefined") {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  }
  return [];
};

export const saveTasks = (tasks: Task[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }
};
