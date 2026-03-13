# People — Vision Prototype

Prototipo de experiencia para **People**, un marketplace que conecta clientes con profesionales de limpieza. Solo frontend: datos mock, sin base de datos ni servicios externos.

## Cómo ejecutar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Qué incluye

- **Landing** — Hero y CTAs
- **Login (mock)** — Cualquier email/contraseña redirige al panel
- **Panel** — Reservas próximas y anteriores; enlace a reservar
- **Listado de profesionales** — 6 profesionales mock con foto, valoración, precio, badges
- **Perfil de profesional** — Bio, servicios, valoraciones, “Reservar”
- **Flujo de reserva (5 pasos)** — Tipo de servicio, descripción del espacio, fecha/hora (validación 24 h), lista de preparación, confirmación
- **Seguimiento de reserva** — Timeline (Pendiente → Aceptado → En curso → Completado) y botones para simular cambios de estado
- **Valoración** — Tras completar, dejar estrellas y comentario; se refleja en el perfil del profesional

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Estado en React Context (PrototypeContext)
- Sin Prisma, Clerk, Stripe ni APIs externas

## Estructura relevante

- `app/` — Páginas (landing, login, dashboard, professionals, booking, track, review)
- `components/` — Navbar, ProfessionalCard, BookingSteps, Timeline, RatingStars, ChecklistPreview
- `context/PrototypeContext.tsx` — Estado global: login, reservas, valoraciones
- `lib/mockData.ts` — 6 profesionales y constantes
- `lib/checklistGenerator.ts` — Lista de preparación según tipo de propiedad y extras
- `lib/pricingCalculator.ts` — Precio y duración estimada (urgencia ×1.5)

## Optimización de espacio

- **`.next`** — No se versiona; se regenera con `npm run build`. Si no estás desarrollando, puedes borrarlo: `rm -rf .next`.
- **Video en `public/`** — El video del landing (~7 MB) es el asset más pesado. Para reducir: comprimir con ffmpeg (ej. `ffmpeg -i "video landing inicial.mp4" -c:v libx264 -crf 28 -preset slow video-optimized.mp4`) o servirlo desde un CDN y enlazarlo por URL.
- **Dependencias** — El proyecto usa pocas deps; `npm prune` no suele liberar mucho. Para menos peso en disco en otros clones, considera `pnpm` en lugar de `npm`.
