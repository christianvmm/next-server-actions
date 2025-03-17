'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { signUp } from '@/features/auth/actions/sign-up'
import { setFormErrors, useServerAction } from '@/lib/server-action'
import { SignUpData, signUpSchema } from '@/features/auth/schema'
import { ControlledInput } from '@/components/form/controlled-input'

export function SignUpForm() {
   const form = useForm<SignUpData>({
      resolver: zodResolver(signUpSchema),
      defaultValues: {
         name: '',
         email: '',
         password: '',
         confirmPassword: '',
      },
   })
   const signUpMutation = useServerAction(signUp, {
      onValidationError: (errors) => setFormErrors(form, errors),
   })

   async function onSubmit(data: SignUpData) {
      signUpMutation.execute(data)
   }

   return (
      <div className='container max-w-xl flex justify-center items-center'>
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className='space-y-4'
               id='register-form'
            >
               <ControlledInput
                  control={form.control}
                  name='name'
                  label='Name'
                  required
               />

               <ControlledInput
                  control={form.control}
                  name='email'
                  label='Email'
                  placeholder='ejemplo@mail.com'
                  required
               />

               <ControlledInput
                  control={form.control}
                  name='password'
                  label='Password'
                  type='password'
                  required
               />

               <ControlledInput
                  control={form.control}
                  name='confirmPassword'
                  label='Confirm Password'
                  type='password'
                  required
               />

               <Button
                  type='submit'
                  className='w-full'
                  form='register-form'
                  isLoading={signUpMutation.isLoading}
               >
                  Sign Up
               </Button>
            </form>
         </Form>
      </div>
   )
}
