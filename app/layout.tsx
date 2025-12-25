import '@/styles/global.css'
import '@/styles/hljs.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: "Álvaro's Place",
    template: "%s | Álvaro's Place"
  },
  description: 'Personal website and blog by Álvaro',
  openGraph: {
    title: "Álvaro's Place",
    description: 'Personal website and blog by Álvaro',
    url: 'https://alvarojunqueira.com.br',
    siteName: "Álvaro's Place",
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Álvaro's Place",
    description: 'Personal website and blog by Álvaro',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
