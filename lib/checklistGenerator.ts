/**
 * Lista de preparación dinámica. Ítems obligatorios (required) deben estar marcados para continuar.
 */

export interface ChecklistItem {
  id: string;
  label: string;
  required?: boolean;
}

const BASE_ITEMS: ChecklistItem[] = [
  { id: 'products', label: 'Productos de limpieza básicos disponibles', required: true },
  { id: 'bags', label: 'Bolsas de basura disponibles', required: true },
  { id: 'vacuum', label: 'Aspirador disponible' },
  { id: 'surfaces', label: 'Superficies despejadas para facilitar la limpieza' },
];

const PET_ITEMS: ChecklistItem[] = [
  { id: 'pets', label: 'Mascotas en zona segura o indicar al profesional' },
];

const WINDOWS_ITEMS: ChecklistItem[] = [
  { id: 'ladder', label: 'Escalera o taburete estable (si se limpian ventanas altas)' },
];

const EMERGENCY_ITEMS: ChecklistItem[] = [
  { id: 'access', label: 'Acceso claro y puntual para el profesional' },
];

export function generateChecklist(options: {
  propertyType: string;
  addOns: string[];
  hasPets: boolean;
  emergency: boolean;
}): ChecklistItem[] {
  const items: ChecklistItem[] = [...BASE_ITEMS];

  if (options.hasPets) items.push(...PET_ITEMS);
  if (options.addOns.includes('windows')) items.push(...WINDOWS_ITEMS);
  if (options.emergency) items.push(...EMERGENCY_ITEMS);

  return items;
}

export function getRequiredIds(items: ChecklistItem[]): string[] {
  return items.filter((i) => i.required).map((i) => i.id);
}
