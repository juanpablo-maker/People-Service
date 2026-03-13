'use client';

import type { BookingStatus } from '@/lib/mockData';

const STATUS_ORDER: BookingStatus[] = ['pending', 'accepted', 'in_progress', 'completed'];

const STATUS_LABELS: Record<BookingStatus, string> = {
  pending: 'Pendiente',
  accepted: 'Aceptado',
  in_progress: 'En curso',
  completed: 'Completado',
};

const PHASE_DESCRIPTIONS: Record<BookingStatus, { current: string; next?: string }> = {
  pending: {
    current: 'El profesional aún no ha confirmado tu reserva.',
    next: 'Siguiente: el profesional aceptará o rechazará. Recibirás confirmación.',
  },
  accepted: {
    current: 'Tu reserva fue aceptada por el profesional.',
    next: 'Siguiente: el profesional iniciará el servicio en la fecha acordada.',
  },
  in_progress: {
    current: 'El servicio está en curso en este momento.',
    next: 'Siguiente: al finalizar, el profesional marcará la reserva como completada.',
  },
  completed: {
    current: 'El servicio fue completado. Puedes dejar una valoración desde el panel.',
  },
};

interface TimelineProps {
  currentStatus: BookingStatus;
  showDescriptions?: boolean;
  className?: string;
}

export function Timeline({
  currentStatus,
  showDescriptions = false,
  className = '',
}: TimelineProps) {
  const currentIndex = STATUS_ORDER.indexOf(currentStatus);
  const desc = PHASE_DESCRIPTIONS[currentStatus];

  return (
    <div className={className}>
      {showDescriptions && desc && (
        <div className="mb-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm font-medium text-gray-900">En qué fase estás</p>
          <p className="mt-1 text-sm text-gray-700">{desc.current}</p>
          {desc.next && (
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium">Siguiente:</span> {desc.next}
            </p>
          )}
        </div>
      )}
      <div className="flex flex-col gap-0">
        {STATUS_ORDER.map((status, i) => {
          const isPast = i < currentIndex;
          const isCurrent = i === currentIndex;
          return (
            <div key={status} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`h-3 w-3 shrink-0 rounded-full border-2 ${
                    isPast || isCurrent
                      ? 'border-accent bg-accent'
                      : 'border-gray-300 bg-white'
                  }`}
                />
                {i < STATUS_ORDER.length - 1 && (
                  <div
                    className={`w-px flex-1 min-h-[20px] ${
                      isPast ? 'bg-accent' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
              <div className="pb-5">
                <span
                  className={`text-sm font-medium ${
                    isPast || isCurrent ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {STATUS_LABELS[status]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
