import * as Apollo from '@apollo/client'
import { FetchResult } from '@apollo/client'
import { JsonSchemaFormProps } from './json-schema/JsonSchemaForm.d'

export type ApolloFormProps<
  TData extends object,
  TVariables extends Apollo.OperationVariables
> = Omit<JsonSchemaFormProps<TData>, 'formData' | 'onChange' | 'onSubmit'> & {
  mutate: Apollo.MutationTuple<any, TVariables>[0] // Using the full object for fails to rerender the state of the parent component, so just pass in the mutate function
  initialFormData: TData
  /** Called after a successful mutation */
  onSubmitSuccessfully?: (r: FetchResult<any>) => any
  /** Called after a failed mutation */
  onSubmitFailed?: (e: any) => any
}
