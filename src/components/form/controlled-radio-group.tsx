import {
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { RadioGroup } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form'

export const ControlledRadioGroup = <
   TFieldValues extends FieldValues = FieldValues,
   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
   children,
   control,
   name,
   label,
   description,
   disabled,
   required,
   className,
}: {
   children: React.ReactNode
   control: ControllerProps<TFieldValues, TName>['control']
   name: ControllerProps<TFieldValues, TName>['name']
   label?: string
   placeholder?: string
   description?: string
   disabled?: boolean
   required?: boolean
   className?: string
}) => {
   return (
      <FormField
         control={control}
         name={name}
         render={({ field }) => (
            <FormItem className='space-y-3'>
               {(label || description) && (
                  <div>
                     {label && (
                        <FormLabel disabled={disabled} required={required}>
                           {label}
                        </FormLabel>
                     )}

                     {description && (
                        <FormDescription>{description}</FormDescription>
                     )}
                  </div>
               )}

               <FormControl>
                  <RadioGroup
                     onValueChange={field.onChange}
                     defaultValue={field.value}
                     className={cn('flex flex-col space-y-1', className)}
                  >
                     {children}
                  </RadioGroup>
               </FormControl>

               <FormMessage />
            </FormItem>
         )}
      />
   )
}
