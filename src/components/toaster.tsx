'use client'
import { useTheme } from 'next-themes'
import { Toaster as T } from 'sonner'

export function Toaster() {
   const { systemTheme } = useTheme()

   return <T position='top-right' theme={systemTheme} richColors />
}
