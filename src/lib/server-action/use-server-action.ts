import {
   type HookBaseUtils,
   type HookCallbacks,
   type HookSafeActionFn,
   useAction,
} from 'next-safe-action/hooks'
import type { z } from 'zod'
import type { InferIn } from 'next-safe-action/adapters/types'
import { toast } from 'sonner'

type IfInstalled<T> = unknown extends T ? never : T
export type Schema = IfInstalled<z.ZodType>
type OnSuccessArgs<S extends Schema | undefined, Data> = {
   input: S extends Schema ? InferIn<S> : undefined
} & (Data extends void ? void : { data: NonNullable<Data> })

export const useServerAction = <
   ServerError,
   S extends Schema | undefined,
   const BAS extends readonly Schema[],
   CVE,
   CBAVE,
   Data
>(
   handler: HookSafeActionFn<ServerError, S, BAS, CVE, CBAVE, Data>,
   options?: HookBaseUtils<S> &
      Omit<
         HookCallbacks<ServerError, S, BAS, CVE, CBAVE, Data>,
         'onSuccess'
      > & {
         onServerError?: (error: ServerError | undefined) => void
         onValidationError?: (error: CVE) => void
         onSuccess?: (args: OnSuccessArgs<S, Data>) => unknown
      }
) => {
   const opts = options || {}

   const action = useAction(handler, {
      ...options,
      onSuccess: (args) => {
         const result = {
            input: args.input,
         } as OnSuccessArgs<S, Data>

         // @ts-expect-error Avoid autocompletion of "data" key when server action return is void
         if (args.data) result.data = args.data

         opts.onSuccess?.(result)
      },
      onError: (args) => {
         opts?.onError?.(args)

         /**
          * Split errors into different handlers
          */
         if (args.error.serverError) {
            if (options?.onServerError) {
               options.onServerError(args.error.serverError)
            } else if (typeof args.error.serverError === 'string') {
               toast.error(args.error.serverError)
            }
         }

         if (args.error.validationErrors) {
            opts?.onValidationError?.(args.error.validationErrors)
         }
      },
   })

   return {
      ...action,
      isLoading: action.isPending,
   }
}
