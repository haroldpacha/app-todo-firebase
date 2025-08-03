import React from 'react';
import { Filter } from 'lucide-react';
import clsx from 'clsx';

interface PriorityFilterProps {
  selectedPriority: number | null;
  onChange: (priority: number | null) => void;
  showCompleted: 'all' | 'completed' | 'pending';
  onCompletedChange: (value: 'all' | 'completed' | 'pending') => void;
}

const PRIORITIES = [
  { value: 1, label: 'Baja', color: 'bg-green-100 text-green-800 hover:bg-green-200' },
  { value: 2, label: 'Media', color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' },
  { value: 3, label: 'Alta', color: 'bg-red-100 text-red-800 hover:bg-red-200' },
];

export default function PriorityFilter({ selectedPriority, onChange, showCompleted, onCompletedChange }: PriorityFilterProps) {
  return (
    <div className="flex flex-col gap-3 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 text-gray-600">
        <Filter className="w-5 h-5" />
        <span className="font-medium">Filtrar por prioridad:</span>
      </div>
      <div className="flex gap-2 mb-2">
        {PRIORITIES.map((priority) => (
          <button
            key={priority.value}
            onClick={() => onChange(selectedPriority === priority.value ? null : priority.value)}
            className={clsx(
              'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
              selectedPriority === priority.value
                ? priority.color.replace('hover:', '')
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {priority.label}
          </button>
        ))}
        {selectedPriority && (
          <button
            onClick={() => onChange(null)}
            className="px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            Limpiar filtro
          </button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-600">Estado:</span>
        <button
          className={clsx('px-3 py-1.5 rounded-md text-sm font-medium transition-colors', showCompleted === 'all' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}
          onClick={() => onCompletedChange('all')}
        >Todos</button>
        <button
          className={clsx('px-3 py-1.5 rounded-md text-sm font-medium transition-colors', showCompleted === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}
          onClick={() => onCompletedChange('completed')}
        >Completados</button>
        <button
          className={clsx('px-3 py-1.5 rounded-md text-sm font-medium transition-colors', showCompleted === 'pending' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}
          onClick={() => onCompletedChange('pending')}
        >Pendientes</button>
      </div>
    </div>
  );
}