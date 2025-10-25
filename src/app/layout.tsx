import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'I Ching Divination - Ancient Wisdom for Modern Life',
  description: 'Explore the ancient wisdom of the I Ching through interactive divination, personalized readings, and multi-language support.',
  keywords: ['I Ching', 'divination', 'ancient wisdom', 'oracle', 'hexagram', 'Book of Changes'],
  authors: [{ name: 'I Ching Divination App' }],
  creator: 'I Ching Divination App',
  publisher: 'I Ching Divination App',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ijing.vercel.app'),
  openGraph: {
    title: 'I Ching Divination - Ancient Wisdom for Modern Life',
    description: 'Explore the ancient wisdom of the I Ching through interactive divination, personalized readings, and multi-language support.',
    url: 'https://ijing.vercel.app',
    siteName: 'I Ching Divination',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'I Ching Divination App',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'I Ching Divination - Ancient Wisdom for Modern Life',
    description: 'Explore the ancient wisdom of the I Ching through interactive divination, personalized readings, and multi-language support.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
