import { Form } from '@cui/ui-atoms'
import {
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from 'react-hook-form'

interface CuiFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues extends FieldValues | undefined = undefined,
> {
  children: React.ReactNode
  form: UseFormReturn<TFieldValues, TContext, TTransformedValues>
  onSubmit: TTransformedValues extends undefined
    ? SubmitHandler<TFieldValues>
    : TTransformedValues extends FieldValues
    ? SubmitHandler<TTransformedValues>
    : never
}

export const CuiForm = <
  TFieldvalues extends FieldValues,
  TContext = unknown,
  TTransformedValues extends FieldValues | undefined = undefined,
>({
  children,
  form,
  onSubmit,
}: CuiFormProps<TFieldvalues, TContext, TTransformedValues>) => {
  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </form>
    </Form>
  )
}
