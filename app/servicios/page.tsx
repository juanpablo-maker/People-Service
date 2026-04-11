import {
  ServiceCategoryHeader,
  ServiceCategorySegment,
} from '@/components/ServiceCategorySegment';
import { PremiumServicesSection } from '@/components/PremiumServicesSection';
import { ServiceSection } from '@/components/ServiceSection';
import { SERVICES_CATALOG } from '@/lib/servicesCatalog';
import { ServiciosAnchorEffects } from './ServiciosAnchorEffects';

const baseIcon = (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const premiumIcon = (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);

const especialIcon = (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.75 21h16.5M4.5 3h15M5 3v18m14-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
    />
  </svg>
);

export default function ServiciosPage() {
  const [baseCat, premiumCat, especialCat] = SERVICES_CATALOG;
  const homeSvc = baseCat.services.find((s) => s.anchorId === 'limpieza-hogar');
  const officeSvc = baseCat.services.find((s) => s.anchorId === 'limpieza-oficina');
  if (!homeSvc?.valueProp || !officeSvc?.valueProp) {
    throw new Error('Catálogo incompleto: se requiere valueProp para servicios base.');
  }

  return (
    <div className="overflow-x-hidden">
      {/* Intro funcional: compacto, alineado al contenido, separado del bloque blanco con borde sutil */}
      <div className="border-b border-gray-200/80 bg-gray-50">
        <div className="mx-auto max-w-6xl px-3 py-3.5 sm:px-6 sm:py-4 lg:px-8">
          <ServiciosAnchorEffects />
          <header className="max-w-xl text-left text-balance">
            <h1 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl md:text-2xl lg:text-3xl">
              Servicios de limpieza
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-gray-600 sm:mt-4 md:text-lg md:leading-relaxed">
              Elige el tipo de limpieza que necesitas. Precio claro antes de confirmar.
            </p>
          </header>
        </div>
      </div>

      {/* Segmento 1: Servicios base (fondo blanco) */}
      <ServiceCategorySegment
        tone="white"
        ariaLabelledBy="heading-servicios-base"
        sectionPadding="tightAfterIntro"
      >
        <ServiceCategoryHeader
          id="heading-servicios-base"
          title={baseCat.title}
          description={baseCat.intro}
          icon={baseIcon}
        />
        <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-14">
          <ServiceSection
            anchorId={homeSvc.anchorId}
            title={homeSvc.label}
            descriptionLines={homeSvc.valueProp.descriptionLines}
            bullets={homeSvc.valueProp.benefits}
            image={{
              src: '/servicios/limpieza-hogar.png',
              alt: 'Profesional de limpieza con uniforme y materiales en cocina moderna',
            }}
            ctaLabel={homeSvc.valueProp.ctaLabel}
            ctaHref={homeSvc.valueProp.ctaHref}
            reverse={false}
            imagePriority
            imageFit="contain"
          />
          <ServiceSection
            anchorId={officeSvc.anchorId}
            title={officeSvc.label}
            descriptionLines={officeSvc.valueProp.descriptionLines}
            bullets={officeSvc.valueProp.benefits}
            image={{
              src: '/servicios/limpieza-oficina.png',
              alt: 'Profesional de limpieza limpiando un escritorio en oficina moderna con uniforme People & Service',
            }}
            ctaLabel={officeSvc.valueProp.ctaLabel}
            ctaHref={officeSvc.valueProp.ctaHref}
            reverse
          />
        </div>
      </ServiceCategorySegment>

      {/* Segmento 2: Servicios premium (fondo gris claro) */}
      <ServiceCategorySegment tone="muted" ariaLabelledBy="heading-servicios-premium">
        <ServiceCategoryHeader
          id="heading-servicios-premium"
          title={premiumCat.title}
          description={premiumCat.intro}
          icon={premiumIcon}
        />
        <PremiumServicesSection
          imagePriority
          image={{
            src: '/servicios/premium-mudanza.png',
            alt:
              'Profesional de People & Service barriendo el piso durante mudanza, cajas etiquetadas cocina sala dormitorio y caja de cuarto de niño',
          }}
          items={premiumCat.services.map((s) => ({
            anchorId: s.anchorId,
            title: s.label,
            description: s.description,
            icon: s.icon,
          }))}
        />
      </ServiceCategorySegment>

      {/* Segmento 3: Especializados y empresariales (fondo blanco, layout editorial como premium) */}
      <ServiceCategorySegment
        tone="white"
        ariaLabelledBy="heading-servicios-especializados"
        sectionPadding="compactTop"
      >
        <ServiceCategoryHeader
          id="heading-servicios-especializados"
          title={especialCat.title}
          description={especialCat.intro}
          icon={especialIcon}
          compact
        />
        <PremiumServicesSection
          image={{
            src: '/servicios/especializados-editorial.png',
            alt:
              'Profesional de People & Service acompañando a un niño en el hogar, juego con bloques y ambiente luminoso',
          }}
          items={especialCat.services.map((s) => ({
            anchorId: s.anchorId,
            title: s.label,
            description: s.description,
            icon: s.icon,
          }))}
        />
      </ServiceCategorySegment>
    </div>
  );
}
