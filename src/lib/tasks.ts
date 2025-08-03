
import { ref, get, set, update, push,query, orderByChild } from 'firebase/database';
import { db } from './firebase';
import { Task } from '../types';

const tasksRef = ref(db, 'tasks');

export async function addTask(task: Omit<Task, 'id'>): Promise<Task> {
  const newTaskRef = push(tasksRef);
  const newTask = { ...task, id: newTaskRef.key ?? '', createdAt: Date.now() };
  await set(newTaskRef, newTask);
  return newTask;
}

export async function getTasks(): Promise<Task[]> {
  const tasksQuery = query(ref(db, 'tasks'), orderByChild('createdAt'));
  const snapshot = await get(tasksQuery);
  if (!snapshot.exists()) return [];
  
  const tasks: Task[] = [];
  snapshot.forEach((childSnapshot) => {
    tasks.push({
      id: childSnapshot.key,
      ...childSnapshot.val()
    });
  });

  // Orden descendente (de más reciente a más antiguo)
  return tasks.reverse();
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

export async function updateTaskArchive(id: string, archived: boolean): Promise<void> {
  const taskRef = ref(db, `tasks/${id}`);
  await update(taskRef, { archived });
}