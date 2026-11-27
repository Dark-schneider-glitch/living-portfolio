import type { Metadata } from 'next';
import { Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/Nav';
import { ScrollController } from '@/components/ScrollController';
import { ThemeProvider } from '@/components/ThemeProvider';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mayank Thakur | IT Support, AI Websites & n8n Automation',
  description: 'Mayank Thakur is an IT support professional in Delhi, India, building AI-assisted websites, landing pages, portfolios, and n8n automations.',
  openGraph: {
    title: 'Mayank Thakur | IT Support & AI Web Creator',
    description: 'Reliable IT support, AI-assisted web design, and practical n8n automation.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#080301',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${outfit.variable} ${jetbrainsMono.variable} font-sans min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] antialiased`}>
        <ThemeProvider>
          <Nav />
          <main className="relative z-0">
            {children}
          </main>
          <ScrollController />
        </ThemeProvider>
      </body>
    </html>
  );
}
