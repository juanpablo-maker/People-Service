'use client';

import { useState, useRef } from 'react';
import { createCelebrationParticles } from '@/lib/celebration';
import type { CelebrationParticle } from '@/lib/celebration';
import { CelebrationOverlay } from '@/components/CelebrationOverlay';

const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbz8z3WMp-urPpH7s_cZaYEPZouOky57XS82K9HkW8gc_mlx-1FJt3KfVTIIQqaTMHDY/exec';
const WHATSAPP_NUMBER = '573115146225';

function getTamanoLabel(tipo: string, value: string): string {
  if (!value) return '';
  const fromVivienda = TAMANO_VIVIENDA.find((o) => o.value === value)?.label;
  const fromOficina = TAMANO_OFICINA.find((o) => o.value === value)?.label;
  return fromVivienda ?? fromOficina ?? value;
}

function buildWhatsAppMessage(data: {
  nombre: string;
  tipoEspacio: string;
  tamanoEspacio: string;
  direccion: string;
  email: string;
  telefono: string;
  fechaServicio: string;
  horaServicio: string;
  detalles: string;
}): string {
  const tipoLabel = ESPACIO_OPCIONES.find((o) => o.value === data.tipoEspacio)?.label ?? data.tipoEspacio;
  const tamanoLabel = getTamanoLabel(data.tipoEspacio, data.tamanoEspacio);
  const espacioLine = tamanoLabel ? `${tipoLabel} (${tamanoLabel})` : tipoLabel;
  const lines: string[] = [
    'Hola, acabo de enviar mi solicitud por la web de People & Service. Resumen:',
    `• Nombre: ${data.nombre}`,
    `• Espacio: ${espacioLine}`,
    `• Dirección: ${data.direccion}`,
    `• Email: ${data.email}`,
    `• Teléfono: ${data.telefono}`,
  ];
  if (data.fechaServicio || data.horaServicio) {
    lines.push(`• Fecha/hora preferida: ${[data.fechaServicio, data.horaServicio].filter(Boolean).join(' ')}`);
  }
  if (data.detalles) {
    lines.push(`• Detalles: ${data.detalles}`);
  }
  return lines.join('\n');
}

const ESPACIO_OPCIONES = [
  { value: 'casa', label: 'Casa' },
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'oficina', label: 'Oficina' },
  { value: 'local', label: 'Local comercial' },
  { value: 'otro', label: 'Otro' },
] as const;

const TAMANO_VIVIENDA = [
  { value: 'apartaestudio', label: 'Apartaestudio' },
  { value: '1-habitacion', label: '1 habitación' },
  { value: '2-habitaciones', label: '2 habitaciones' },
  { value: '3-habitaciones', label: '3 habitaciones' },
  { value: '4-mas-habitaciones', label: '4 o más habitaciones' },
];

const TAMANO_OFICINA = [
  { value: 'hasta-5', label: 'Hasta 5 personas' },
  { value: '6-15', label: '6 a 15 personas' },
  { value: '16-30', label: '16 a 30 personas' },
  { value: 'mas-30', label: 'Más de 30 personas' },
];

type EspacioTipo = (typeof ESPACIO_OPCIONES)[number]['value'];

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [particles, setParticles] = useState<CelebrationParticle[] | null>(null);
  const [espacioTipo, setEspacioTipo] = useState<EspacioTipo | ''>('');
  const [tamanoEspacio, setTamanoEspacio] = useState('');

  const handleEspacioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as EspacioTipo | '';
    setEspacioTipo(value);
    setTamanoEspacio('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      nombre: (formData.get('name') as string)?.trim() ?? '',
      tipoEspacio: espacioTipo || ((formData.get('espacioTipo') as string) ?? ''),
      tamanoEspacio: tamanoEspacio.trim(),
      direccion: (formData.get('address') as string)?.trim() ?? '',
      email: (formData.get('email') as string)?.trim() ?? '',
      telefono: (formData.get('phone') as string)?.trim() ?? '',
      fechaServicio: (formData.get('serviceDate') as string)?.trim() ?? '',
      horaServicio: (formData.get('serviceTime') as string)?.trim() ?? '',
      detalles: (formData.get('details') as string)?.trim() ?? '',
    };

    console.log('ContactForm payload:', data);

    setLoading(true);

    try {
      const response = await fetch(WEBAPP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      const responseText = await response.text();
      console.log('Response text:', responseText);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      formRef.current?.reset();
      setEspacioTipo('');
      setTamanoEspacio('');
      setSent(true);

      setParticles(createCelebrationParticles());
      const message = buildWhatsAppMessage(data);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
      setTimeout(() => {
        setParticles(null);
        window.location.href = whatsappUrl;
      }, 1300);
    } catch (err) {
      console.error('Error enviando formulario:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <>
        <CelebrationOverlay particles={particles} />
        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
          <p className="font-medium text-emerald-800">Recibimos tu solicitud. Pronto te contactaremos.</p>
          <p className="mt-1 text-sm text-emerald-700">Te responderemos en menos de 24 horas.</p>
        </div>
      </>
    );
  }

  const inputClass =
    'mt-1.5 w-full min-h-[48px] rounded-xl border border-gray-200 px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20';
  const selectClass = inputClass;

  const isTamanoSelect =
    espacioTipo === 'casa' ||
    espacioTipo === 'apartamento' ||
    espacioTipo === 'oficina' ||
    espacioTipo === 'local';

  const isTamanoOtro = espacioTipo === 'otro';
  const showTamanoField = isTamanoSelect || isTamanoOtro;

  return (
    <>
      <CelebrationOverlay particles={particles} />
      <form ref={formRef} onSubmit={handleSubmit} className="max-w-full space-y-4">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          No pudimos enviar tu solicitud. Inténtalo de nuevo.
        </div>
      )}

      <p className="text-sm text-gray-600">Los siguientes campos son obligatorios.</p>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre <span className="text-emerald-600">*</span>
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          className={inputClass}
          placeholder="Tu nombre"
        />
      </div>

      <div>
        <label htmlFor="espacioTipo" className="block text-sm font-medium text-gray-700">
          Espacio a ser limpiado <span className="text-emerald-600">*</span>
        </label>
        <select
          id="espacioTipo"
          name="espacioTipo"
          required
          value={espacioTipo}
          onChange={handleEspacioChange}
          className={selectClass}
        >
          <option value="">Selecciona una opción</option>
          {ESPACIO_OPCIONES.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {showTamanoField && (
        <div>
          <label htmlFor="tamanoEspacio" className="block text-sm font-medium text-gray-700">
            ¿Cuál describe mejor tu espacio? <span className="text-emerald-600">*</span>
          </label>
          <p className="mt-0.5 text-xs text-gray-500">
            No necesitas saber los metros cuadrados exactos.
          </p>

          {isTamanoSelect && (
            <select
              id="tamanoEspacio"
              name="tamanoEspacio"
              required
              value={tamanoEspacio}
              onChange={(e) => setTamanoEspacio(e.target.value)}
              className={selectClass}
            >
              <option value="">Selecciona una opción</option>
              {espacioTipo === 'casa' || espacioTipo === 'apartamento'
                ? TAMANO_VIVIENDA.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))
                : TAMANO_OFICINA.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
            </select>
          )}

          {isTamanoOtro && (
            <input
              id="tamanoEspacio"
              type="text"
              name="tamanoEspacio"
              required
              value={tamanoEspacio}
              onChange={(e) => setTamanoEspacio(e.target.value)}
              className={inputClass}
              placeholder="Describe brevemente el tamaño o tipo de espacio"
            />
          )}
        </div>
      )}

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Dirección <span className="text-emerald-600">*</span>
        </label>
        <input
          id="address"
          type="text"
          name="address"
          required
          className={inputClass}
          placeholder="Calle, ciudad, barrio"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email <span className="text-emerald-600">*</span>
        </label>
        <input
          id="email"
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          required
          className={inputClass}
          placeholder="correo@ejemplo.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Teléfono <span className="text-emerald-600">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          inputMode="tel"
          autoComplete="tel"
          required
          className={inputClass}
          placeholder="+57 300 123 4567"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          ¿Cuándo te gustaría tener el servicio?
        </label>
        <div className="mt-1.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            id="serviceDate"
            type="date"
            name="serviceDate"
            min={new Date().toISOString().slice(0, 10)}
            className={inputClass}
            aria-label="Fecha preferida"
          />
          <input
            id="serviceTime"
            type="time"
            name="serviceTime"
            defaultValue="08:00"
            className={inputClass}
            aria-label="Hora tentativa"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Elige fecha y hora tentativa. Te confirmaremos la disponibilidad.
        </p>
      </div>

      <div>
        <label htmlFor="details" className="block text-sm font-medium text-gray-700">
          Describe en qué podemos ayudarte y el espacio o lugar que quieres que atendamos
        </label>
        <textarea
          id="details"
          name="details"
          rows={3}
          className={`${inputClass} min-h-[80px]`}
          placeholder="Ej. Casa 80 m², 3 habitaciones; necesito limpieza semanal los lunes."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full min-h-[48px] rounded-2xl bg-emerald-600 px-6 py-3.5 text-base font-medium text-white shadow-soft transition-all hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 touch-manipulation"
      >
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
    </>
  );
}
