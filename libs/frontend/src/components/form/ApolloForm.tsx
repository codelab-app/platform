import * as Apollo from '@apollo/client'
import React from 'react'
import { ApolloFormProps } from './ApolloForm.d'
import { JsonSchemaForm, JsonSchemaFormEvent } from './json-schema'

/**
 * Read to use form, can be used with modal or standalone
 */
export type ApolloFormUseCaseProps<TData extends object> = Pick<
  ApolloFormProps<TData, any>,
  'onSubmitError' | 'onSubmitSuccess'
>

export const ApolloForm = <
  TData extends object,
  TVariable extends Apollo.OperationVariables
>({
  hideSubmitButton,
  mutate,
  ...props
}: ApolloFormProps<TData, any>) => {
  const onSubmit = ({ data: submitData }: JsonSchemaFormEvent<TData>) => {
    return mutate({
      variables: {
        input: {
          ...submitData,
        },
      },
    })
  }

  return (
    <JsonSchemaForm<TData>
      hideSubmitButton={hideSubmitButton}
      onSubmit={onSubmit}
      {...props}
    />
  )
}
