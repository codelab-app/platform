import * as Apollo from '@apollo/client'
import { JsonSchemaFormProps } from './json-schema/JsonSchemaForm.d'

export type ApolloFormProps<
  TData extends object,
  TVariables extends Apollo.OperationVariables
> = Omit<JsonSchemaFormProps<TData>, 'onChange' | 'onSubmit'> & {
  mutation: Apollo.MutationTuple<any, TVariables>
  // Stub shape of form data
  formData: TData
}
