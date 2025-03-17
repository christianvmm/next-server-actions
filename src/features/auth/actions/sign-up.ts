'use server'

import { returnValidationErrors } from 'next-safe-action'
import { signUpSchema } from '@/features/auth/schema'
import { actionClient } from '@/lib/server-action/client'
import { sleep } from '@/utils/sleep'
import { AppError } from '@/lib/errors'

export const signUp = actionClient
   .schema(signUpSchema)
   .action(async ({ parsedInput: data }) => {
      await sleep(2000)

      if (data.errorReason === 'validation') {
         returnValidationErrors(signUpSchema, {
            email: {
               _errors: ['Email already taken.'],
            },
         })
      }

      if (data.errorReason === 'server') {
         throw new AppError('An unknown error ocurred, try again later.')
      }

      console.log(data)
   })
