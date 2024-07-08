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
import { CuiForm } from './CuiForm'
import { CuiFormField } from './CuiFormField'

const formSchema = Type.Object({
  email: Type.String({}),
  username: Type.String({
    errorMessage: 'Username must be at least 2 characters.',
    minLength: 2,
  }),
})

type ProfileFormSchema = Static<typeof formSchema>

export const ProfileForm = () => {
  const form = useForm<ProfileFormSchema>({
    defaultValues: {
      email: '',
      username: '',
    },
    resolver: typeboxResolver(formSchema),
  })

  const onSubmit = (values: ProfileFormSchema) => {
    console.log(values)
  }

  return (
    <CuiForm<ProfileFormSchema> form={form} onSubmit={onSubmit}>
      <CuiFormField<ProfileFormSchema> form={form} name="username" />
      <CuiFormField<ProfileFormSchema> form={form} name="email" />
      <Button type="submit">Submit</Button>
    </CuiForm>
  )
}
