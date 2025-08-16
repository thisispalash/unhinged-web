import type { Metadata } from 'next';
import { Indie_Flower, Quicksand } from 'next/font/google';
import './globals.css';

import ClientLayout from '@/component/ClientLayout';

const indieFlower = Indie_Flower({
  variable: '--font-indie-flower',
  subsets: ['latin'],
  weight: ['400'],
});

const quicksand = Quicksand({
  variable: '--font-quicksand',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Unhinged',
  description: 'Have what it takes to defend your hot takes?',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/img/logo-clear.png" />
      </head>
      <body
        className={`${indieFlower.variable} ${quicksand.variable} antialiased`}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
