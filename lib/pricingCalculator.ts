/**
 * Precios en COP (pesos colombianos). Sin decimales en display.
 */

const DEFAULT_BASE_HOURS = 2;

export function calculatePrice(options: {
  basePricePerHourCOP: number;
  emergency: boolean;
  emergencyMultiplier: number;
  estimatedHours?: number;
}): number {
  const hours = options.estimatedHours ?? DEFAULT_BASE_HOURS;
  let total = options.basePricePerHourCOP * hours;
  if (options.emergency) {
    total = Math.round(total * options.emergencyMultiplier);
  }
  return Math.round(total);
}

/** Formato COP: $85.000 */
export function formatPriceCOP(cop: number): string {
  return '$' + cop.toLocaleString('es-CO');
}

/** Alias para mantener compatibilidad donde se use formatPrice */
export function formatPrice(cop: number): string {
  return formatPriceCOP(cop);
}

export function estimateDuration(options: {
  sizeValue?: number;
  sizeUnit?: 'sqm' | 'rooms';
  addOns: string[];
  baseHours?: number;
}): number {
  let hours = options.baseHours ?? DEFAULT_BASE_HOURS;
  const addonCount = options.addOns?.length ?? 0;
  if (addonCount > 0) hours += addonCount * 0.25;
  const val = options.sizeValue ?? 0;
  if (options.sizeUnit === 'sqm' && val > 100) hours += 0.5;
  if (options.sizeUnit === 'sqm' && val > 150) hours += 0.5;
  if (options.sizeUnit === 'rooms' && val > 3) hours += 0.25;
  return Math.min(hours, 6);
}
