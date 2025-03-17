'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { SignUpData, signUpSchema } from '@/features/auth/schema'
import { signUp } from '@/features/auth/actions/sign-up'
import { setFormErrors, useServerAction } from '@/lib/server-action'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Form } from '@/components/ui/form'
import { ControlledRadioGroup } from '@/components/form/controlled-radio-group'
import { ControlledInput } from '@/components/form/controlled-input'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export default function Home() {
   const form = useForm({
      resolver: zodResolver(signUpSchema),
      defaultValues: {
         name: 'John Doe',
         email: 'hello@example.com',
         password: 'm#P52s@ap$V',
         confirmPassword: 'm#P52s@ap$V',
         errorReason: 'none',
      },
   })

   const signUpMutation = useServerAction(signUp, {
      onValidationError(result) {
         setFormErrors(form, result)
      },
      onSuccess() {
         toast.success('User created successfully.')
      },
   })

   function onSubmit(data: SignUpData) {
      signUpMutation.execute(data)
   }

   return (
      <main className='w-full container max-w-screen-lg mx-auto flex justify-center items-center min-h-full p-4'>
         <Form {...form}>
            <form
               className='border h-full relative grid grid-cols-1 md:grid-cols-2'
               onSubmit={form.handleSubmit(onSubmit)}
               noValidate
            >
               <Cross className='absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2' />
               <Cross className='absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2' />

               <section className='p-10 space-y-5'>
                  <h1 className='text-3xl font-semibold  tracking-tight'>
                     Next.js Server Actions Example
                  </h1>

                  <p>
                     <span className='font-medium'>Next Safe Action. </span>
                     <span className='text-muted-foreground'>
                        Type-safe validation and error handling for Server
                        Actions.
                     </span>
                  </p>

                  <p>
                     <span className='font-medium'>Zod. </span>
                     <span className='text-muted-foreground'>
                        Runtime schema validation integrated with TypeScript and
                        Next Safe Action to validate form data.
                     </span>
                  </p>

                  <p>
                     <span className='font-medium'>React Hook Form. </span>
                     <span className='text-muted-foreground'>
                        Efficient form state management
                     </span>
                  </p>

                  <div>
                     <span className='font-medium'>Shadcn. </span>
                     <span className='text-muted-foreground'>
                        Reusable and accessible UI components.
                     </span>
                  </div>

                  <div className='space-y-5'>
                     <span className='font-medium'>Simulate Error:</span>

                     <ControlledRadioGroup
                        required
                        control={form.control}
                        name='errorReason'
                     >
                        {[
                           { value: 'none', label: 'None' },
                           { value: 'validation', label: 'Validation Error' },
                           { value: 'server', label: 'Server Error' },
                        ].map((type) => {
                           return (
                              <div
                                 className='flex items-center space-x-2'
                                 key={type.value}
                              >
                                 <RadioGroupItem
                                    value={type.value}
                                    id={type.value}
                                 />
                                 <Label htmlFor={type.value}>
                                    {type.label}
                                 </Label>
                              </div>
                           )
                        })}
                     </ControlledRadioGroup>
                  </div>
               </section>

               <section className='bg-white dark:bg-[#0A0A0A] border-l p-10 space-y-6'>
                  <ControlledInput
                     control={form.control}
                     name='name'
                     label='Full Name'
                     placeholder='John Doe'
                  />

                  <ControlledInput
                     control={form.control}
                     name='email'
                     type='email'
                     label='Email'
                     placeholder='Email address'
                  />

                  <ControlledInput
                     control={form.control}
                     name='password'
                     type='password'
                     label='Password'
                  />

                  <ControlledInput
                     control={form.control}
                     name='confirmPassword'
                     type='password'
                     label='Confirm password'
                  />

                  <div className='w-full flex gap-4 items-center'>
                     <span className='text-xs text-muted-foreground'>
                        By clicking &apos;Create account&apos;, I acknowledge I
                        have read and understand the Privacy Notice.
                     </span>

                     <div>
                        <Button
                           type='submit'
                           isLoading={signUpMutation.isLoading}
                        >
                           Create account
                        </Button>
                     </div>
                  </div>
               </section>
            </form>
         </Form>
      </main>
   )
}

function Cross({ className }: { className?: string }) {
   return (
      <div className={cn('flex items-center justify-center', className)}>
         <div className='relative w-3 h-3 md:w-5 md:h-5'>
            <div className='absolute top-1/2 left-0 w-full h-[1px] dark:bg-[#878787] transform -translate-y-1/2'></div>
            <div className='absolute left-1/2 top-0 h-full w-[1px] dark:bg-[#878787] transform -translate-x-1/2'></div>
         </div>
      </div>
   )
}
