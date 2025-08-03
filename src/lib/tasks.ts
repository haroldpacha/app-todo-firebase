export async function updateTaskArchive(id: string, archived: boolean): Promise<void> {
  const taskRef = ref(db, `tasks/${id}`);
  await update(taskRef, { archived });
}
import { ref, get, set, update, push } from 'firebase/database';
import { db } from './firebase';
import { Task } from '../types';

const tasksRef = ref(db, 'tasks');

export async function addTask(task: Omit<Task, 'id'>): Promise<Task> {
  const newTaskRef = push(tasksRef);
  const newTask = { ...task, id: newTaskRef.key ?? '' };
  await set(newTaskRef, newTask);
  return newTask;
}

export async function getTasks(): Promise<Task[]> {
  const snapshot = await get(tasksRef);
  if (!snapshot.exists()) return [];
  
  const tasks: Task[] = [];
  snapshot.forEach((childSnapshot) => {
    tasks.push({
      id: childSnapshot.key,
      ...childSnapshot.val()
    });
  });
  
  return tasks;
}

export async function toggleTask(id: string): Promise<void> {
  const taskRef = ref(db, `tasks/${id}`);
  const snapshot = await get(taskRef);
  if (snapshot.exists()) {
    const task = snapshot.val();
    await update(taskRef, {
      completed: !task.completed
    });
  }
}