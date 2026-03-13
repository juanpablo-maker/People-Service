import { ContactForm } from '@/components/ContactForm';

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section id="contacto" className="border-t border-gray-200 bg-emerald-50/40 px-4 py-12 pb-20 sm:px-6 sm:py-14 sm:pb-24 lg:px-8" aria-label="Formulario de contacto">
        <div className="mx-auto max-w-xl">
          <h1 className="text-center text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
            Déjanos tus datos y te contactamos
          </h1>
          <p className="mt-2 text-center text-gray-600">
            Te respondemos en menos de 24 horas.
          </p>
          <p className="mt-1 flex items-center justify-center gap-2 text-xs text-gray-500">
            <svg className="h-4 w-4 shrink-0 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Tus datos están seguros. Solo te contactamos para tu solicitud.
          </p>
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-soft sm:mt-8 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
