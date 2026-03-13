'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  MOCK_PROFESSIONALS,
  SERVICE_TYPE_LABELS,
  PROPERTY_TYPE_LABELS,
  ADDON_OPTIONS,
  type ServiceType,
  type PropertyType,
} from '@/lib/mockData';
import { generateChecklist } from '@/lib/checklistGenerator';
import {
  calculatePrice,
  formatPriceCOP,
  estimateDuration,
} from '@/lib/pricingCalculator';
import { getRequiredIds } from '@/lib/checklistGenerator';
import { usePrototype } from '@/context/PrototypeContext';
import { BookingSteps } from '@/components/BookingSteps';
import { ChecklistPreview } from '@/components/ChecklistPreview';
import { addHours, isAfter } from 'date-fns';

const MIN_HOURS_AHEAD = 24;

function getMinDateTime(): Date {
  return addHours(new Date(), MIN_HOURS_AHEAD);
}

function isDateValid(date: Date): boolean {
  return isAfter(date, getMinDateTime());
}

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoggedIn, addBooking } = usePrototype();
  const professionalId = searchParams.get('professionalId') || '';

  const professional = MOCK_PROFESSIONALS.find((p) => p.id === professionalId);

  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState<ServiceType | 'custom'>('home');
  const [customService, setCustomService] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('apartment');
  const [sizeUnit, setSizeUnit] = useState<'sqm' | 'rooms'>('sqm');
  const [sizeValue, setSizeValue] = useState<string>('');
  const [bathrooms, setBathrooms] = useState(1);
  const [hasPets, setHasPets] = useState(false);
  const [addOns, setAddOns] = useState<string[]>([]);
  const [emergency, setEmergency] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [dateError, setDateError] = useState<string | null>(null);
  const [checklistCheckedIds, setChecklistCheckedIds] = useState<string[]>([]);

  useEffect(() => {
    if (!isLoggedIn) router.replace('/login');
  }, [isLoggedIn, router]);

  if (!professional) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-gray-500">Selecciona un profesional para reservar.</p>
        <Link href="/professionals" className="mt-4 inline-block text-accent hover:underline">
          Ver profesionales
        </Link>
      </div>
    );
  }

  const sizeNum = sizeValue ? parseInt(sizeValue, 10) : undefined;
  const estimatedHours = estimateDuration({
    sizeValue: sizeNum,
    sizeUnit,
    addOns,
  });
  const totalPrice = calculatePrice({
    basePricePerHourCOP: professional.basePricePerHour,
    emergency: emergency && professional.emergencyAvailable,
    emergencyMultiplier: professional.emergencyMultiplier,
    estimatedHours,
  });

  const checklist = generateChecklist({
    propertyType,
    addOns,
    hasPets,
    emergency: emergency && professional.emergencyAvailable,
  });
  const requiredChecklistIds = getRequiredIds(checklist);
  const requiredChecked = requiredChecklistIds.every((id) => checklistCheckedIds.includes(id));
  const sizeDisplay = sizeValue
    ? sizeUnit === 'sqm'
      ? `${sizeValue} m²`
      : `${sizeValue} habitaciones`
    : undefined;

  const selectedDateTime =
    date && time ? new Date(`${date}T${time}`) : null;
  const dateTimeValid = selectedDateTime ? isDateValid(selectedDateTime) : false;

  const handleConfirm = () => {
    if (!dateTimeValid || !address) {
      setDateError('La reserva debe ser al menos 24 horas desde ahora y debes indicar una dirección.');
      return;
    }
    if (!serviceType || (serviceType === 'custom' && !customService.trim())) {
      setDateError('Indica el tipo de servicio.');
      return;
    }
    setDateError(null);
    const bookingId = addBooking({
      professionalId: professional.id,
      professionalName: professional.name,
      serviceType: serviceType === 'custom' ? customService : SERVICE_TYPE_LABELS[serviceType] || serviceType,
      propertyType,
      dateTime: selectedDateTime!.toISOString(),
      address,
      size: sizeDisplay,
      bathrooms,
      hasPets,
      addOns,
      emergency: emergency && professional.emergencyAvailable,
      totalPrice,
      estimatedDurationHours: estimatedHours,
    });
    router.push(`/booking/track/${bookingId}`);
  };

  const steps = [
    {
      step: 1,
      title: 'Tipo de servicio',
      children: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Servicio</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value as ServiceType | 'custom')}
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            >
              {Object.entries(SERVICE_TYPE_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
            {serviceType === 'custom' && (
              <input
                type="text"
                value={customService}
                onChange={(e) => setCustomService(e.target.value)}
                placeholder="Describe el servicio"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5"
              />
            )}
          </div>
          {professional.emergencyAvailable && (
            <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={emergency}
                  onChange={(e) => setEmergency(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                />
                <div>
                  <span className="font-medium text-gray-900">Atención urgente</span>
                  <p className="mt-1 text-sm text-gray-600">
                    Servicio programado con menos de 24 horas de diferencia. El servicio normal se agenda con más de 24 horas de antelación.
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Tarifa: +{((professional.emergencyMultiplier - 1) * 100).toFixed(0)}%
                  </p>
                </div>
              </label>
            </div>
          )}
          <button
            type="button"
            onClick={() => setStep(2)}
            className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            Siguiente
          </button>
        </div>
      ),
    },
    {
      step: 2,
      title: 'Descripción del espacio',
      children: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de propiedad</label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value as PropertyType)}
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5"
            >
              {Object.entries(PROPERTY_TYPE_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tamaño del espacio</label>
            <div className="mt-2 flex gap-4">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="sizeUnit"
                  checked={sizeUnit === 'sqm'}
                  onChange={() => setSizeUnit('sqm')}
                  className="h-4 w-4 border-gray-300 text-accent focus:ring-accent"
                />
                <span className="text-sm">m²</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="sizeUnit"
                  checked={sizeUnit === 'rooms'}
                  onChange={() => setSizeUnit('rooms')}
                  className="h-4 w-4 border-gray-300 text-accent focus:ring-accent"
                />
                <span className="text-sm">Habitaciones</span>
              </label>
            </div>
            <input
              type="number"
              min={1}
              value={sizeValue}
              onChange={(e) => setSizeValue(e.target.value)}
              placeholder={sizeUnit === 'sqm' ? 'ej. 80' : 'ej. 3'}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Baños</label>
              <input
                type="number"
                min={0}
                value={bathrooms}
                onChange={(e) => setBathrooms(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5"
              />
            </div>
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={hasPets}
              onChange={(e) => setHasPets(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
            />
            <span className="text-sm text-gray-700">Hay mascotas</span>
          </label>
          <div>
            <label className="block text-sm font-medium text-gray-700">Extras (opcional)</label>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {ADDON_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border-2 px-3 py-2.5 transition-colors ${
                    addOns.includes(opt.id)
                      ? 'border-accent bg-accent/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={addOns.includes(opt.id)}
                    onChange={() =>
                      setAddOns((prev) =>
                        prev.includes(opt.id)
                          ? prev.filter((x) => x !== opt.id)
                          : [...prev, opt.id]
                      )
                    }
                    className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                  />
                  <span className="text-sm font-medium">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Atrás
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
            >
              Siguiente
            </button>
          </div>
        </div>
      ),
    },
    {
      step: 3,
      title: 'Fecha y hora',
      children: (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            La reserva debe ser al menos 24 horas desde ahora.
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700">Dirección</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Calle, ciudad, código postal"
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha</label>
              <input
                type="date"
                value={date}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(e) => {
                  setDate(e.target.value);
                  setDateError(null);
                }}
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hora</label>
              <input
                type="time"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                  setDateError(null);
                }}
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5"
              />
            </div>
          </div>
          {selectedDateTime && !dateTimeValid && (
            <p className="text-sm font-medium text-red-600">
              La reserva debe ser al menos 24 horas desde ahora. Elige otra fecha u hora.
            </p>
          )}
          {dateError && (
            <p className="text-sm font-medium text-red-600">{dateError}</p>
          )}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Atrás
            </button>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
            >
              Siguiente
            </button>
          </div>
        </div>
      ),
    },
    {
      step: 4,
      title: 'Lista de preparación',
      children: (
        <div className="space-y-6">
          <ChecklistPreview
            items={checklist}
            checkedIds={checklistCheckedIds}
            onToggle={(id) =>
              setChecklistCheckedIds((prev) =>
                prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
              )
            }
          />
          {!requiredChecked && requiredChecklistIds.length > 0 && (
            <p className="text-sm font-medium text-amber-700">
              Marca los elementos indispensables (*) para continuar: productos de limpieza básicos y bolsas de basura.
            </p>
          )}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Atrás
            </button>
            <button
              type="button"
              onClick={() => setStep(5)}
              disabled={!requiredChecked}
              className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      ),
    },
    {
      step: 5,
      title: 'Confirmación',
      children: (
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-600">Resumen</p>
            <p className="mt-1 font-medium text-gray-900">{professional.name}</p>
            <p className="mt-1 text-sm text-gray-600">
              {serviceType === 'custom' ? customService : SERVICE_TYPE_LABELS[serviceType]} · {propertyType}
              {sizeDisplay && ` · ${sizeDisplay}`}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              {address} · {date && time && selectedDateTime
                ? selectedDateTime.toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' })
                : '—'}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Duración estimada: {estimatedHours} h
            </p>
            <p className="mt-2 text-xl font-semibold text-gray-900">
              {formatPriceCOP(totalPrice)} COP
            </p>
            {emergency && professional.emergencyAvailable && (
              <p className="mt-1 text-xs text-gray-500">Atención urgente aplicada</p>
            )}
          </div>
          {dateError && (
            <p className="text-sm font-medium text-red-600">{dateError}</p>
          )}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(4)}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Atrás
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!dateTimeValid || !address}
              className="rounded-xl bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
            >
              Confirmar reserva
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
        Reservar con {professional.name}
      </h1>
      <p className="mt-1 text-gray-600">
        Completa los pasos para confirmar tu reserva.
      </p>
      <div className="mt-8">
        <BookingSteps
          steps={steps}
          currentStep={step}
          onStepClick={(s) => setStep(s)}
        />
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-2xl px-4 py-10 text-center text-gray-500">Cargando...</div>}>
      <BookingContent />
    </Suspense>
  );
}
