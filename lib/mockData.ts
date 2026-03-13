/**
 * Mock data for the People vision prototype.
 * No database — all data is in memory for UX validation.
 */

export type ServiceType =
  | 'home'
  | 'office'
  | 'deep'
  | 'move_in_out'
  | 'custom';

export type PropertyType = 'apartment' | 'house' | 'office';

export type BookingStatus =
  | 'pending'
  | 'accepted'
  | 'in_progress'
  | 'completed';

export interface MockProfessional {
  id: string;
  name: string;
  imageUrl: string | null;
  rating: number;
  totalReviews: number;
  yearsExperience: number;
  basePricePerHour: number; // COP por hora
  emergencyAvailable: boolean;
  emergencyMultiplier: number;
  bio: string;
  services: string[];
  reviews: { customerName: string; rating: number; comment: string; date: string }[];
  badge?: 'top_rated' | 'new';
}

export interface MockBooking {
  id: string;
  professionalId: string;
  professionalName: string;
  serviceType: string;
  propertyType: PropertyType;
  dateTime: string; // ISO
  address: string;
  size?: string;
  bathrooms: number;
  hasPets: boolean;
  addOns: string[];
  emergency: boolean;
  totalPrice: number; // COP
  status: BookingStatus;
  estimatedDurationHours: number;
}

export interface MockReview {
  id: string;
  bookingId: string;
  professionalId: string;
  rating: number;
  comment: string;
  customerName: string;
}

/** Imágenes placeholder por profesional (mujeres/personas) */
const PRO_IMAGES = [
  'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=300&fit=crop',
];

/** 6 mock professionals for the listing. Precios en COP. */
export const MOCK_PROFESSIONALS: MockProfessional[] = [
  {
    id: 'pro-1',
    name: 'María García',
    imageUrl: PRO_IMAGES[0],
    rating: 4.9,
    totalReviews: 124,
    yearsExperience: 8,
    basePricePerHour: 45000, // COP/h
    emergencyAvailable: true,
    emergencyMultiplier: 1.5,
    bio: 'Profesional de limpieza con más de 8 años de experiencia. Especializada en hogares y oficinas. Me encanta dejar cada espacio impecable.',
    services: ['Limpieza de hogar', 'Limpieza profunda', 'Limpieza de oficina'],
    reviews: [
      { customerName: 'Ana L.', rating: 5, comment: 'Excelente trabajo, muy recomendable.', date: '2024-01-15' },
      { customerName: 'Carlos M.', rating: 5, comment: 'Puntual y muy detallista.', date: '2024-01-10' },
    ],
    badge: 'top_rated',
  },
  {
    id: 'pro-2',
    name: 'Laura Martínez',
    imageUrl: PRO_IMAGES[1],
    rating: 4.8,
    totalReviews: 89,
    yearsExperience: 5,
    basePricePerHour: 42000,
    emergencyAvailable: true,
    emergencyMultiplier: 1.5,
    bio: 'Cuido cada detalle para que tu espacio quede como nuevo. Experiencia en mudanzas y limpieza post-obras.',
    services: ['Limpieza de hogar', 'Limpieza post-mudanza', 'Limpieza profunda'],
    reviews: [
      { customerName: 'Pedro S.', rating: 5, comment: 'Muy contento con el resultado.', date: '2024-01-12' },
    ],
    badge: 'new',
  },
  {
    id: 'pro-3',
    name: 'Sofia López',
    imageUrl: PRO_IMAGES[2],
    rating: 4.7,
    totalReviews: 56,
    yearsExperience: 4,
    basePricePerHour: 38000,
    emergencyAvailable: false,
    emergencyMultiplier: 1.5,
    bio: 'Limpieza ecológica y respetuosa con el medio ambiente. Productos seguros para niños y mascotas.',
    services: ['Limpieza de hogar', 'Limpieza de oficina'],
    reviews: [
      { customerName: 'Elena R.', rating: 4, comment: 'Muy bien, repetiré.', date: '2024-01-08' },
    ],
  },
  {
    id: 'pro-4',
    name: 'Carmen Ruiz',
    imageUrl: PRO_IMAGES[3],
    rating: 4.9,
    totalReviews: 201,
    yearsExperience: 12,
    basePricePerHour: 52000,
    emergencyAvailable: true,
    emergencyMultiplier: 1.5,
    bio: 'Más de una década dedicada a la limpieza profesional. Oficinas y hogares de alto estándar.',
    services: ['Limpieza de hogar', 'Limpieza de oficina', 'Limpieza profunda', 'Limpieza post-obras'],
    reviews: [
      { customerName: 'Juan P.', rating: 5, comment: 'La mejor profesional que hemos tenido.', date: '2024-01-14' },
    ],
    badge: 'top_rated',
  },
  {
    id: 'pro-5',
    name: 'Elena Fernández',
    imageUrl: PRO_IMAGES[4],
    rating: 4.6,
    totalReviews: 34,
    yearsExperience: 3,
    basePricePerHour: 36000,
    emergencyAvailable: true,
    emergencyMultiplier: 1.5,
    bio: 'Joven profesional con ganas de dar el mejor servicio. Especialista en hogares con mascotas.',
    services: ['Limpieza de hogar', 'Limpieza profunda'],
    reviews: [
      { customerName: 'Marta G.', rating: 5, comment: 'Superó expectativas.', date: '2024-01-05' },
    ],
    badge: 'new',
  },
  {
    id: 'pro-6',
    name: 'Isabel Torres',
    imageUrl: PRO_IMAGES[5],
    rating: 4.8,
    totalReviews: 67,
    yearsExperience: 6,
    basePricePerHour: 44000,
    emergencyAvailable: false,
    emergencyMultiplier: 1.5,
    bio: 'Enfocada en limpiezas profundas y de mudanza. Seria y comprometida.',
    services: ['Limpieza profunda', 'Limpieza post-mudanza', 'Limpieza de hogar'],
    reviews: [
      { customerName: 'Luis F.', rating: 4, comment: 'Muy bien todo.', date: '2024-01-03' },
    ],
  },
];

export const SERVICE_TYPE_LABELS: Record<string, string> = {
  home: 'Limpieza de hogar',
  office: 'Limpieza de oficina',
  deep: 'Limpieza profunda',
  move_in_out: 'Mudanza / Entrada-Salida',
  custom: 'Otro (personalizado)',
};

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  apartment: 'Apartamento',
  house: 'Casa',
  office: 'Oficina',
};

export const ADDON_OPTIONS = [
  { id: 'fridge', label: 'Nevera' },
  { id: 'oven', label: 'Horno' },
  { id: 'windows', label: 'Ventanas' },
  { id: 'balcony', label: 'Balcón' },
  { id: 'garage', label: 'Garaje' },
  { id: 'inside_cabinets', label: 'Interior de muebles' },
  { id: 'laundry', label: 'Lavado y doblado de ropa' },
  { id: 'ironing', label: 'Planchado' },
  { id: 'bathroom_deep', label: 'Baño a fondo' },
  { id: 'inside_oven', label: 'Interior del horno' },
];
