'use client';

import React from 'react';

interface Step {
  step: number;
  title: string;
  children: React.ReactNode;
}

interface BookingStepsProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function BookingSteps({
  steps,
  currentStep,
  onStepClick,
}: BookingStepsProps) {
  return (
    <div className="space-y-6">
      {steps.map(({ step, title, children }) => {
        const isActive = step === currentStep;
        const isPast = step < currentStep;
        return (
          <div
            key={step}
            className={`rounded-2xl border bg-white p-6 shadow-sm transition-shadow ${
              isActive ? 'border-accent/30 shadow-soft-md' : 'border-gray-200'
            }`}
          >
            <button
              type="button"
              onClick={() => onStepClick?.(step)}
              className="flex w-full items-center gap-4 text-left"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${
                  isPast
                    ? 'bg-accent text-white'
                    : isActive
                      ? 'bg-accent/10 text-accent'
                      : 'bg-gray-100 text-gray-400'
                }`}
              >
                {isPast ? '✓' : step}
              </div>
              <h3
                className={`text-lg font-semibold ${
                  isActive ? 'text-gray-900' : isPast ? 'text-gray-700' : 'text-gray-400'
                }`}
              >
                {title}
              </h3>
            </button>
            {isActive && <div className="mt-5">{children}</div>}
          </div>
        );
      })}
    </div>
  );
}
