import { auth } from '@/lib/auth'
import { AppError, UnauthenticatedError } from '@/lib/errors'
import { createSafeActionClient } from 'next-safe-action'

/**
 * Base Client
 */
const DEFAULT_ERROR_MESSAGE = 'An unexpected error occurred, please try again.'

export const actionClient = createSafeActionClient({
   handleServerError(e) {
      /**
       * Only manually throwed AppErrors will reach the client
       * Every other error (like database errors) will send the DEFAULT_ERROR_MESSAGE
       */
      if (e instanceof AppError && e.message) {
         return e.message
      }

      console.log(e.message)

      return DEFAULT_ERROR_MESSAGE
   },
}).use(async ({ next }) => {
   const user = await auth.getUser()

   return next({
      ctx: {
         user,
      },
   })
})

/**
 * Auth Client
 */
export const authActionClient = actionClient.use(async ({ next }) => {
   const user = await auth.getUser()

   if (!user) {
      throw new UnauthenticatedError()
   }

   return next({
      ctx: {
         user,
      },
   })
})
