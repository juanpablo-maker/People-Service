import { MOCK_PROFESSIONALS } from '@/lib/mockData';
import { ProfessionalCard } from '@/components/ProfessionalCard';

export default function ProfessionalsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
        Profesionales
      </h1>
      <p className="mt-1 text-gray-600">
        Elige un profesional de limpieza verificado para tu reserva.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {MOCK_PROFESSIONALS.map((pro) => (
          <ProfessionalCard key={pro.id} professional={pro} />
        ))}
      </div>
    </div>
  );
}
