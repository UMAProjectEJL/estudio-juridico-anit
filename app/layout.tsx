import type { Metadata, Viewport } from 'next';
import './globals.css';

// Set NEXT_PUBLIC_SITE_URL to the real domain before publishing.
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
const siteRoot = `${siteUrl}/`;
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(siteRoot),
  title: 'Dra. Violeta de las Mercedes Anit | Abogada en CABA y Buenos Aires',
  description: 'Asesoramiento y representación jurídica en CABA y Provincia de Buenos Aires. Sucesiones, familia, amparos de salud, derecho civil y más. Consultá por WhatsApp.',
  keywords: ['abogada en Capital Federal', 'abogada en Provincia de Buenos Aires', 'abogada de sucesiones', 'prescripción adquisitiva', 'amparos de salud', 'abogada de familia', 'exequátur en Argentina', 'asesoramiento jurídico tributario'],
  openGraph: {
    title: 'Dra. Violeta de las Mercedes Anit | Asesoramiento jurídico',
    description: 'Tus derechos merecen ser defendidos. Atención en CABA y Provincia de Buenos Aires.',
    locale: 'es_AR',
    type: 'website',
    url: siteRoot,
    images: [{ url: `${siteRoot}images/justicia-buenos-aires.jpg`, width: 1400, height: 933, alt: 'Palacio de Justicia de Buenos Aires y estatua de la Justicia' }]
  },
  alternates: { canonical: siteRoot },
  robots: { index: true, follow: true },
  ...(googleVerification ? { verification: { google: googleVerification } } : {})
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#10263c' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-AR"><body>{children}</body></html>;
}
