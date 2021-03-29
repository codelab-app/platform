import * as Apollo from '@apollo/client'
import { JsonSchemaFormProps } from '../json-schema/Form-jsonSchema--types'

export type ApolloFormProps<
  TData extends Record<string, unknown>,
  TVariables extends Apollo.OperationVariables
> = Omit<JsonSchemaFormProps<TData>, 'formData' | 'onSubmit'> & {
  // Using the full object for fails to re-render the state of the parent component, so just pass in the mutate function
  mutate: Apollo.MutationTuple<any, TVariables>[0]
}
