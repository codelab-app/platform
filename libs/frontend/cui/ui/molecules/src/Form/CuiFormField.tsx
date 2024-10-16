import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@cui/ui-atoms'
import { Input } from 'antd'

interface CuiFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
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
          <FormLabel>{title ?? name.charAt(0).toUpperCase()}</FormLabel>
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
