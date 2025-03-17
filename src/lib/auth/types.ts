import { User } from '@/features/users/types'
import { z } from 'zod'

export const tokenSchema = z.object({
   id: z.string(),
})

export type Token = z.infer<typeof tokenSchema>
export type TokenUser = Omit<User, 'password'>
