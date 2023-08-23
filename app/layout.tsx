import './globals.css'
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Provider from '@/components/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
        </Provider>
        </body>
    </html>
  )
}
