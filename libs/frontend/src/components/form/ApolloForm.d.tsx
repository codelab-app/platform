import * as Apollo from '@apollo/client'
import { JsonSchemaFormProps } from './json-schema/JsonSchemaForm.d'

export type UseMutation<
  TData extends object,
  TVariables extends Apollo.OperationVariables
> = (
  options?: Apollo.MutationHookOptions<TData, TVariables>,
) => Apollo.MutationTuple<TData, TVariables>

export interface ApolloFormProps<
  TData extends object,
  TVariables extends Apollo.OperationVariables
> extends JsonSchemaFormProps<TData> {
  useMutation: UseMutation<TData, TVariables>
  variables: TVariables
  input: object
  // Stub shape of form data
  formData: TData
}
