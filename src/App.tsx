import React, { useEffect, useState } from 'react';
import { ListTodo, PlusCircle, BarChart } from 'lucide-react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import PriorityFilter from './components/PriorityFilter';
import { Task } from './types';
import { addTask, getTasks, toggleTask } from './lib/tasks';
import StatsModal from './components/StatsModal';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<number | null>(null);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (task: Omit<Task, 'id' | 'completed'>) => {
    try {
      await addTask({ ...task, completed: false });
      await fetchTasks();
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleToggleTask = async (id: string) => {
    try {
      await toggleTask(id);
      await fetchTasks();
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const filteredTasks = selectedPriority
    ? tasks.filter(task => task.priority === selectedPriority)
    : tasks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <ListTodo className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsStatsOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors border border-indigo-200"
            >
              <BarChart className="w-5 h-5" />
              Estadísticas
            </button>
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              Nueva Tarea
            </button>
          </div>
        </header>

        <PriorityFilter
          selectedPriority={selectedPriority}
          onChange={setSelectedPriority}
        />

        <main className="mt-6">
          <TaskList tasks={filteredTasks} onToggleTask={handleToggleTask} />
        </main>

        {isFormOpen && (
          <TaskForm onSubmit={handleAddTask} onClose={() => setIsFormOpen(false)} />
        )}

        {isStatsOpen && (
          <StatsModal tasks={tasks} onClose={() => setIsStatsOpen(false)} />
        )}
      </div>
    </div>
  );
}

export default App;