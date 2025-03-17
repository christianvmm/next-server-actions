import { type Token, tokenSchema } from './types'
import { JWT_SECRET } from '@/consts'
import jwt from 'jsonwebtoken'

export function decodeToken(token: string): Token | undefined {
   try {
      const decodedToken = jwt.verify(token, JWT_SECRET)
      const result = tokenSchema.safeParse(decodedToken)
      return result.data
   } catch (err) {
      if (err instanceof Error) {
         console.log('decodeToken error: ' + err.message)
      }

      return
   }
}
