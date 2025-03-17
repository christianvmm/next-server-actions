import { users } from '@/data/fake-users'
import { decodeToken } from '@/lib/auth/decode-token'
import type { TokenUser } from '@/lib/auth/types'

export async function extractTokenUser(
   tokenStr: string | undefined | null
): Promise<TokenUser | null> {
   if (!tokenStr) return null

   const token = decodeToken(tokenStr)

   if (!token) return null

   /**
    * Replace for some real db
    */
   const user = users.find((u) => u.id === token.id)

   if (!user) return null

   const { password: _, ...data } = user

   return {
      ...token,
      ...data,
   }
}
