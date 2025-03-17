import type { Metadata } from 'next'
import { AppProvider } from '@/providers'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
   variable: '--font-geist-sans',
   subsets: ['latin'],
})

const geistMono = Geist_Mono({
   variable: '--font-geist-mono',
   subsets: ['latin'],
})

export const metadata: Metadata = {
   title: 'Next.js Server Actions Example',
   description:
      'Full implementation of Next.js Server Actions. Includes type safety, error handling, client and server side validation, and more.',
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang='en' suppressHydrationWarning>
         <body
            className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
         >
            <AppProvider>{children}</AppProvider>
         </body>
      </html>
   )
}
