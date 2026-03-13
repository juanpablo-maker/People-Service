import type { Metadata, Viewport } from 'next';
import './globals.css';
import { PrototypeProvider } from '@/context/PrototypeContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#059669',
};

export const metadata: Metadata = {
  title: 'People — Limpieza de confianza',
  description: 'Limpieza profesional para oficinas y espacios comerciales. Planes recurrentes, mismo equipo y facturación clara. Te contactamos.',
  keywords: ['limpieza', 'oficina', 'espacios comerciales', 'Colombia', 'planes recurrentes'],
  authors: [{ name: 'People' }],
  openGraph: {
    title: 'People — Limpieza de confianza',
    description: 'Limpieza profesional para oficinas y espacios comerciales. Planes recurrentes y facturación clara.',
    type: 'website',
    locale: 'es_CO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'People — Limpieza de confianza',
    description: 'Limpieza profesional para oficinas y espacios comerciales.',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 font-sans antialiased flex flex-col">
        <PrototypeProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </PrototypeProvider>
      </body>
    </html>
  );
}
