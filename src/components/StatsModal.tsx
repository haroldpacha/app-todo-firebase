import React, { useState } from 'react';
import { X, ClipboardList, Clock, DollarSign, ChevronDown } from 'lucide-react';
import { Task } from '../types';
import clsx from 'clsx';

interface StatsModalProps {
  tasks: Task[];
  onClose: () => void;
}

const PRIORITIES = [
  { value: 1, label: 'Baja', color: 'text-green-600 bg-green-50' },
  { value: 2, label: 'Media', color: 'text-yellow-600 bg-yellow-50' },
  { value: 3, label: 'Alta', color: 'text-red-600 bg-red-50' },
];

export default function StatsModal({ tasks, onClose }: StatsModalProps) {
  const [expandedPriority, setExpandedPriority] = useState<number | null>(null);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalCost = tasks.reduce((sum, task) => sum + (task.cost || 0), 0);
  const totalMinutes = tasks.reduce((sum, task) => sum + (task.time || 0), 0);
  
  const formatTime = (totalMinutes: number) => {
    if (totalMinutes === 0) return '0min';
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 0 
      ? minutes > 0 ? `${hours}h ${minutes}min` : `${hours}h`
      : `${minutes}min`;
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
    }).format(amount);
  };

  const getStatsByPriority = (priority: number) => {
    const priorityTasks = tasks.filter(task => task.priority === priority);
    return {
      total: priorityTasks.length,
      completed: priorityTasks.filter(task => task.completed).length,
      cost: priorityTasks.reduce((sum, task) => sum + (task.cost || 0), 0),
      time: priorityTasks.reduce((sum, task) => sum + (task.time || 0), 0),
    };
  };

  const overallStats = [
    {
      icon: <ClipboardList className="w-6 h-6 text-indigo-600" />,
      label: 'Total de Tareas',
      value: `${completedTasks}/${totalTasks} completadas`,
      progress: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
    },
    {
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
      label: 'Costo Total',
      value: formatMoney(totalCost),
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      label: 'Tiempo Total',
      value: formatTime(totalMinutes),
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Resumen de Tareas</h2>

        <div className="space-y-6">
          {/* Overall Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {overallStats.map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  {stat.icon}
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
                <p className="text-lg font-semibold text-gray-800">{stat.value}</p>
                {'progress' in stat && (
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                      style={{ width: `${stat.progress}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Priority Breakdown */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Desglose por Prioridad</h3>
            <div className="space-y-3">
              {PRIORITIES.map((priority) => {
                const stats = getStatsByPriority(priority.value);
                const isExpanded = expandedPriority === priority.value;
                
                return (
                  <div
                    key={priority.value}
                    className="border rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedPriority(isExpanded ? null : priority.value)}
                      className={clsx(
                        'w-full flex items-center justify-between p-4 text-left transition-colors',
                        priority.color
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-medium">{priority.label}</span>
                        <span className="text-sm">
                          {stats.completed}/{stats.total} tareas
                        </span>
                      </div>
                      <ChevronDown
                        className={clsx(
                          'w-5 h-5 transition-transform',
                          isExpanded && 'transform rotate-180'
                        )}
                      />
                    </button>
                    
                    {isExpanded && (
                      <div className="p-4 bg-white border-t space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Costo Total</p>
                            <p className="font-medium">{formatMoney(stats.cost)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Tiempo Total</p>
                            <p className="font-medium">{formatTime(stats.time)}</p>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full">
                          <div
                            className="h-full bg-current rounded-full transition-all duration-300"
                            style={{
                              width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}