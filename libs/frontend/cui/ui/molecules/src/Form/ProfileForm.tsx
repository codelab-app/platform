'use client'

import { Button } from '@cui/ui-atoms/Button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@cui/ui-atoms/Form'
import { Input } from '@cui/ui-atoms/Input'
import { typeboxResolver } from '@hookform/resolvers/typebox'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Static, Type } from '@sinclair/typebox'
import React from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

const formSchema = Type.Object({
  username: Type.String({
    errorMessage: 'Username must be at least 2 characters.',
    minLength: 2,
  }),
})

type ProfileFormSchema = Static<typeof formSchema>

export const ProfileForm = () => {
  const form = useForm<ProfileFormSchema>({
    defaultValues: {
      username: '',
    },
    resolver: typeboxResolver(formSchema),
  })

  const onSubmit = (values: ProfileFormSchema) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
