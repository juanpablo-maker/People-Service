'use client';

import { useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useSwipe } from '@/hooks/useSwipe';

const STEPS = [
  {
    number: 1,
    title: 'Cuéntanos tu espacio',
    detail: 'Metros, frecuencia y horarios preferidos. En segundos nos das la información y te armamos una propuesta a medida.',
    visual: 'form',
  },
  {
    number: 2,
    title: 'Te respondemos',
    detail: 'Propuesta en menos de 2 horas. Precio cerrado, sin sorpresas. Sin compromiso hasta que decidas.',
    visual: 'response',
  },
  {
    number: 3,
    title: 'Arrancamos',
    detail: 'Asignamos el mismo equipo, coordinamos la primera visita y a partir de ahí todo fluye.',
    visual: 'go',
  },
];

function StepVisual({ visual }: { visual: string }) {
  if (visual === 'form') {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </span>
          <div className="min-w-0 flex-1 space-y-2">
            <p className="font-medium text-gray-900">Datos de tu espacio</p>
            <p className="text-sm text-gray-500">Metros², frecuencia, horario preferido</p>
          </div>
        </div>
      </div>
    );
  }
  if (visual === 'response') {
    return (
      <div className="rounded-xl border border-emerald-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-gray-900">Propuesta en tu bandeja</p>
            <p className="mt-0.5 text-sm text-gray-500">Precio cerrado, sin compromiso</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-gray-900">Primera visita coordinada</p>
          <p className="mt-0.5 text-sm text-gray-500">Mismo equipo asignado</p>
        </div>
      </div>
    </div>
  );
}

type HowItWorksProps = { embedded?: boolean };

export function HowItWorks({ embedded = false }: HowItWorksProps) {
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useIsMobile();
  const swipe = useSwipe(STEPS.length, activeStep);

  const stepIndex = isMobile ? swipe.index : activeStep;
  const step = STEPS[stepIndex];

  const content = (
    <div className={embedded ? 'mx-auto w-full max-w-md' : 'mx-auto max-w-5xl'}>
        {/* Móvil: un paso, swipe */}
        {isMobile && (
          <>
            <h2 className="text-center text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
              Cómo funciona
            </h2>
            <div
              className="mt-8 touch-pan-y select-none"
              onTouchStart={swipe.onTouchStart}
              onTouchEnd={swipe.onTouchEnd}
            >
              <div className="flex justify-center gap-2">
                {STEPS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      stepIndex === i ? 'w-8 bg-emerald-500' : 'w-2 bg-gray-300'
                    }`}
                    aria-hidden
                  />
                ))}
              </div>
              <div key={stepIndex} className="mt-6 min-h-[200px] animate-fade-in">
                <p className="text-lg font-semibold text-gray-900">{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.detail}</p>
              </div>
              <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50/80 p-6 shadow-soft">
                <StepVisual visual={step.visual} />
              </div>
              <p className="mt-3 text-center text-xs text-gray-500">Desliza para ver los pasos</p>
            </div>
          </>
        )}

        {/* Desktop: layout original o embebido (card ordenada) */}
        {!isMobile && (
          <>
            {!embedded && (
              <h2 className="text-center text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                Cómo funciona
              </h2>
            )}
            <div className={`flex flex-col gap-4 ${embedded ? 'mt-0 rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-soft sm:p-8' : 'mt-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12'}`}>
              {embedded ? (
                /* Embebido: título + pasos centrados, luego contenido del paso */
                <>
                  <div className="flex flex-col items-center gap-2">
                    <h2 className="text-lg font-semibold tracking-tight text-gray-900 sm:text-xl">
                      Cómo funciona
                    </h2>
                    <div className="flex justify-center gap-2">
                      {STEPS.map((s, i) => (
                        <button
                          key={s.number}
                          type="button"
                          onClick={() => setActiveStep(i)}
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 ${
                            activeStep === i
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'bg-gray-100 text-gray-500 hover:bg-emerald-100 hover:text-emerald-700'
                          }`}
                          aria-pressed={activeStep === i}
                          aria-label={`Paso ${s.number}: ${s.title}`}
                        >
                          {s.number}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div key={activeStep} className="animate-fade-in space-y-1.5 border-t border-gray-100 pt-3">
                    <p className="text-sm font-semibold text-gray-900">{step.title}</p>
                    <p className="text-sm leading-relaxed text-gray-600">{step.detail}</p>
                  </div>
                  <div key={step.visual} className="rounded-xl border border-gray-200 bg-gray-50/80 p-2.5 animate-fade-in">
                    <StepVisual visual={step.visual} />
                  </div>
                </>
              ) : (
                /* No embebido: layout en 2 columnas */
                <>
                  <div className="space-y-6">
                    <div className="flex gap-3">
                      {STEPS.map((s, i) => (
                        <button
                          key={s.number}
                          type="button"
                          onClick={() => setActiveStep(i)}
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 ${
                            activeStep === i
                              ? 'bg-emerald-600 text-white shadow-md scale-110'
                              : 'bg-gray-100 text-gray-500 hover:bg-emerald-100 hover:text-emerald-700'
                          }`}
                          aria-pressed={activeStep === i}
                          aria-label={`Paso ${s.number}: ${s.title}`}
                        >
                          {s.number}
                        </button>
                      ))}
                    </div>
                    <div key={activeStep} className="min-h-[120px] animate-fade-in">
                      <p className="text-lg font-semibold text-gray-900">{step.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.detail}</p>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/80 p-5 shadow-soft">
                    <div className="mb-4 flex justify-center gap-2">
                      {[1, 2, 3].map((n) => (
                        <span
                          key={n}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            activeStep + 1 === n ? 'w-8 bg-emerald-500' : 'w-2 bg-gray-300'
                          }`}
                          aria-hidden
                        />
                      ))}
                    </div>
                    <div key={step.visual} className="animate-fade-in">
                      <StepVisual visual={step.visual} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
    </div>
  );

  if (embedded) return content;

  return (
    <section className="border-t border-gray-100 bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8" aria-label="Cómo funciona">
      {content}
    </section>
  );
}
