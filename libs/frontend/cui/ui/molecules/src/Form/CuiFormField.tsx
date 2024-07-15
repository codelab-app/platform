import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@cui/ui-atoms/Form'
import { Input } from 'antd'
import React from 'react'
import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'
import voca from 'voca'

interface CuiFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
> {
  description?: string
  form: UseFormReturn<TFieldValues, TContext, TTransformedValues>
  name: FieldPath<TFieldValues>
  title?: string
}

export const CuiFormField = <TFieldvalues extends FieldValues>({
  description,
  form,
  name,
  title,
}: CuiFormFieldProps<TFieldvalues>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title ?? voca.capitalize(name)}</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" {...field} />
          </FormControl>
          <>{description ?? <FormDescription>{description}</FormDescription>}</>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
