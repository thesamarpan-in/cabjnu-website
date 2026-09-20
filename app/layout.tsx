import type { Metadata } from 'next';
import { Cormorant_Garamond, Marcellus, Lato } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const marcellus = Marcellus({
  subsets: ['latin'],
  variable: '--font-marcellus',
  weight: ['400'],
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['300', '400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ayurveda.thesamarpan.co.in'),
  title: {
    default: 'Centre for Ayurveda Biology, JNU',
    template: '%s — Centre for Ayurveda Biology, JNU',
  },
  description:
    'Bridging traditional Ayurvedic plant science with molecular biology, at Jawaharlal Nehru University.',
  openGraph: {
    title: 'Centre for Ayurveda Biology, JNU',
    description:
      'Bridging traditional Ayurvedic plant science with molecular biology, at Jawaharlal Nehru University.',
    url: 'https://ayurveda.thesamarpan.co.in',
    siteName: 'Centre for Ayurveda Biology, JNU',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${marcellus.variable} ${lato.variable}`}>
      <body className="font-body">
        <ScrollProgress />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
