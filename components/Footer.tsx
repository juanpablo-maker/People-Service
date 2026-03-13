import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <Link href="/" className="text-lg font-semibold text-gray-900 transition-colors hover:text-emerald-600">
              People & Service
            </Link>
            <p className="text-xs text-gray-500">Cuidamos tu espacio.</p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600" aria-label="Enlaces del sitio">
            <Link href="/quienes-somos" className="transition-colors hover:text-gray-900">
              Quiénes somos
            </Link>
            <Link href="/servicios" className="transition-colors hover:text-gray-900">
              Servicios
            </Link>
            <Link href="/trabaja-con-nosotros" className="transition-colors hover:text-gray-900">
              Trabaja con nosotros
            </Link>
            <Link href="/contacto" className="transition-colors hover:text-gray-900">
              Contacto
            </Link>
          </nav>
        </div>
        <p className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-gray-500 sm:justify-start">
          <span>Pago seguro</span>
          <span className="text-gray-300">·</span>
          <span>Profesionales verificados</span>
          <span className="text-gray-300">·</span>
          <span>Soporte en español</span>
        </p>
        <p className="mt-2 text-center text-xs text-gray-500 sm:text-left">
          © {new Date().getFullYear()} People & Service S.A.S.
        </p>
      </div>
    </footer>
  );
}
