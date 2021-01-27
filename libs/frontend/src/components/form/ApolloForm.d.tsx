import * as Apollo from '@apollo/client'
import { JsonSchemaFormProps } from './json-schema/JsonSchemaForm.d'

export type UseMutation<
  TData extends object,
  TVariables extends Apollo.OperationVariables
> = (
  options?: Apollo.MutationHookOptions<any, TVariables>,
) => Apollo.MutationTuple<any, TVariables>

export type ApolloFormProps<
  TData extends object,
  TVariables extends Apollo.OperationVariables
> = Omit<JsonSchemaFormProps<TData>, 'onChange' | 'onSubmit'> & {
  useMutation: UseMutation<TData, TVariables>
  // Stub shape of form data
  formData: TData
}
