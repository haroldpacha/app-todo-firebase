export interface Task {
  id: string;
  title: string;
  category: string;
  priority: number;
  completed: boolean;
  cost?: number;
  time?: number;
}