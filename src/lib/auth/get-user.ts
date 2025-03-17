'use server'
import { storagePrefix } from '@/config'
import { cookies } from 'next/headers'
import type { TokenUser } from './types'
import { extractTokenUser } from '@/lib/auth/extract-token-user'

export async function getUser(): Promise<TokenUser | null> {
   const tokenStr =
      (await cookies()).get(`${storagePrefix}_token`)?.value || null

   const user = await extractTokenUser(tokenStr)
   return user
}
