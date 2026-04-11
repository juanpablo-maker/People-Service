import { SERVICE_TYPE_LABELS } from '@/lib/mockData';

/** Clase CSS aplicada temporalmente a la card al navegar por hash (ver globals.css). */
export const SERVICE_CARD_HIGHLIGHT_CLASS = 'service-card-highlight';

/**
 * Single source of truth for servicios: anchors, navbar, and página /servicios.
 * anchorId values are URL-safe (ASCII) for hash links and HTML id attributes.
 */
export const SERVICE_ANCHOR_IDS = [
  'limpieza-hogar',
  'limpieza-oficina',
  'limpieza-profunda',
  'mudanza-entrada-salida',
  'planchado-organizacion-closet',
  'todero-mantenimiento-general',
  'jardineria',
  'cuidado-ninos-adulto-mayor',
] as const;

export type ServiceAnchorId = (typeof SERVICE_ANCHOR_IDS)[number];

export type ServiceCategorySlug = 'base' | 'premium' | 'especializados';

/** Contenido tipo value proposition (split sections / cards). Opcional por servicio. */
export interface ServiceValueProp {
  /** Dos líneas: beneficio emocional y beneficio funcional. */
  descriptionLines: readonly [string, string];
  benefits: readonly string[];
  ctaLabel: string;
  ctaHref?: string;
}

export interface ServiceCatalogEntry {
  anchorId: ServiceAnchorId;
  label: string;
  description: string;
  icon?: string;
  accent?: 'emerald' | 'amber';
  /** Si existe, puede usarse en bloques con propuesta de valor (p. ej. sección split en /servicios). */
  valueProp?: ServiceValueProp;
}

export interface ServiceCategoryCatalog {
  id: ServiceCategorySlug;
  title: string;
  intro: string;
  services: ServiceCatalogEntry[];
}

export const SERVICES_CATALOG: ServiceCategoryCatalog[] = [
  {
    id: 'base',
    title: 'Servicios base',
    intro: 'Incluidos en toda reserva. Elige el tipo de espacio que quieres limpiar.',
    services: [
      {
        anchorId: 'limpieza-hogar',
        label: SERVICE_TYPE_LABELS.home,
        description:
          'Aseo general: pisos, cocina, baños y habitaciones. Se prioriza el aseo de acuerdo a tu necesidad',
        valueProp: {
          descriptionLines: [
            'Transforma tu hogar en un espacio limpio, cómodo y armonioso.',
            'Disfruta más tiempo con tu familia y olvídate del estrés de las tareas del hogar.',
          ],
          benefits: [
            'Limpieza profunda en baños, cocina y todas las áreas',
            'El mismo equipo en cada visita, para cuidar tus preferencias',
            'Horarios flexibles que se ajustan a tu rutina',
          ],
          ctaLabel: 'Solicitar cotización',
          ctaHref: '/contacto',
        },
      },
      {
        anchorId: 'limpieza-oficina',
        label: 'Limpieza de oficinas o comercios',
        description:
          'Aseo a tu espacio de trabajo: pisos, mobiliario, polvo. Ordenados para que tu equipo esté cómodo',
        valueProp: {
          descriptionLines: [
            'Mantén tus oficinas impecables y proyecta una excelente imagen corporativa, mientras impulsas la productividad de tu equipo.',
            'Creamos espacios limpios, organizados y saludables para trabajar mejor.',
          ],
          benefits: [
            'Servicio en horarios flexibles',
            'Protocolos de limpieza adaptados a tu industria',
            'Supervisión constante y reportes de calidad',
          ],
          ctaLabel: 'Solicitar cotización',
          ctaHref: '/contacto',
        },
      },
    ],
  },
  {
    id: 'premium',
    title: 'Servicios premium',
    intro: 'Para necesidades más completas o con menos tiempo de anticipación.',
    services: [
      {
        anchorId: 'limpieza-profunda',
        label: SERVICE_TYPE_LABELS.deep,
        description:
          'Se limpia una zona específica como: cocina, baños o pisos; para limpiar a detalle cajos, mobiliario, desinfectar y organizar el espacio.',
        icon: '✨',
        accent: 'emerald',
      },
      {
        anchorId: 'mudanza-entrada-salida',
        label: SERVICE_TYPE_LABELS.move_in_out,
        description:
          'Entrada o salida de vivienda: limpieza completa antes de mudarte o al dejar el inmueble.',
        icon: '📦',
        accent: 'emerald',
      },
      {
        anchorId: 'planchado-organizacion-closet',
        label: 'Planchado y organización de ropa en closet',
        description:
          'Planchado de prendas y orden del armario: doblado, colgado y organización por tipo o temporada para que encuentres todo fácil.',
        icon: '👔',
        accent: 'emerald',
      },
    ],
  },
  {
    id: 'especializados',
    title: 'Servicios Especializados y Empresariales',
    intro:
      'Soluciones más completas para necesidades continuas, mantenimiento y cuidado especializado.',
    services: [
      {
        anchorId: 'todero-mantenimiento-general',
        label: 'Servicio de Todero (Mantenimiento General)',
        description:
          'Atendemos arreglos y mantenimientos básicos en tu hogar o propiedad horizontal. Incluye reparaciones menores, instalaciones, pintura básica y apoyo en distintas tareas para mantener tus espacios en óptimas condiciones.',
        icon: '🔧',
      },
      {
        anchorId: 'jardineria',
        label: 'Servicio de Jardinería',
        description:
          'Cuidado y mantenimiento de zonas verdes. Incluye corte de césped, poda, limpieza y mantenimiento general, asegurando espacios agradables y bien conservados.',
        icon: '🌿',
      },
      {
        anchorId: 'cuidado-ninos-adulto-mayor',
        label: 'Servicio de Cuidado de Niños y Adulto Mayor',
        description:
          'Personal confiable para el cuidado en el hogar. Brindamos acompañamiento, apoyo en actividades diarias y supervisión, garantizando bienestar y tranquilidad.',
        icon: '👶',
      },
    ],
  },
];

/** Labels for compact navbar grouping (dropdown section titles). */
export const SERVICE_CATEGORY_NAV_LABELS: Record<ServiceCategorySlug, string> = {
  base: 'Servicios base',
  premium: 'Servicios premium',
  especializados: 'Servicios especializados y empresariales',
};

/**
 * Orden en el menú desplegable del nav: primero servicios base (hogar / oficina), luego premium y especializados.
 * La página /servicios mantiene su propio orden de segmentos (base → premium → especializados).
 */
export const SERVICES_CATALOG_DROPDOWN_ORDER: readonly ServiceCategorySlug[] = [
  'base',
  'premium',
  'especializados',
] as const;

export function isServiceAnchorId(value: string): value is ServiceAnchorId {
  return (SERVICE_ANCHOR_IDS as readonly string[]).includes(value);
}
