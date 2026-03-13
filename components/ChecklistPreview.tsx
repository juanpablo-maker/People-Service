'use client';

import type { ChecklistItem } from '@/lib/checklistGenerator';

interface ChecklistPreviewProps {
  items: ChecklistItem[];
  checkedIds: string[];
  onToggle: (id: string) => void;
  className?: string;
}

export function ChecklistPreview({
  items,
  checkedIds,
  onToggle,
  className = '',
}: ChecklistPreviewProps) {
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm ${className}`}>
      <h3 className="font-semibold text-gray-900">Lista de preparación</h3>
      <p className="mt-1 text-sm text-gray-500">
        Marca lo que ya tienes listo. Los elementos marcados con * son indispensables para el servicio.
      </p>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3 text-sm text-gray-700">
            <button
              type="button"
              onClick={() => onToggle(item.id)}
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                checkedIds.includes(item.id)
                  ? 'border-accent bg-accent text-white'
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
              aria-pressed={checkedIds.includes(item.id)}
            >
              {checkedIds.includes(item.id) ? '✓' : ''}
            </button>
            <span>
              {item.label}
              {item.required && <span className="text-red-500"> *</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
