'use client'
import { Toaster } from '@/components/toaster'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function AppProvider({ children }: { children: React.ReactNode }) {
   return (
      <NextThemesProvider
         attribute='class'
         defaultTheme='system'
         enableSystem
         disableTransitionOnChange
      >
         <Toaster />

         {children}
      </NextThemesProvider>
   )
}
