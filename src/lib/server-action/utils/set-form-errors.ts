import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import type { Schema } from '../use-server-action'
import type { ValidationErrors } from 'next-safe-action'

export function setFormErrors<T extends FieldValues, U extends Schema>(
   form: UseFormReturn<T>,
   errors: ValidationErrors<U>
) {
   const transformedErrors = transformErrors(errors)

   transformedErrors.forEach((err) => {
      form.setError(err.path as Path<T>, { message: err.errors[0] })
   })
}

type ErrorObject = {
   path: string
   errors: string[]
}

function transformErrors<U extends Schema>(
   errors: ValidationErrors<U>,
   currentPath = ''
): ErrorObject[] {
   let result: ErrorObject[] = []

   for (const key in errors) {
      const value = errors[key]
      const newPath = currentPath ? `${currentPath}.${key}` : key

      if (key === '_errors' && Array.isArray(value)) {
         result.push({
            path: currentPath,
            errors: value,
         })
      } else if (typeof value === 'object' && value !== null) {
         result = result.concat(transformErrors(value, newPath))
      }
   }

   return result
}
