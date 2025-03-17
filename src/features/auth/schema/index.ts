import { z } from 'zod'

export const signUpSchema = z
   .object({
      name: z.string().min(1, { message: 'Enter your name' }),
      email: z.string().email({
         message: 'Enter a valid email',
      }),
      password: z.string().min(6, {
         message: 'Enter at least 6 characters',
      }),
      confirmPassword: z.string().min(6, {
         message: 'Enter at least 6 characters',
      }),
      errorReason: z
         .enum(['none', 'server', 'validation'])
         .optional()
         .nullable(),
   })
   .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
         ctx.addIssue({
            code: 'custom',
            message: 'Passwords do not match',
            path: ['confirmPassword'],
         })
      }
   })

export type SignUpData = z.infer<typeof signUpSchema>
