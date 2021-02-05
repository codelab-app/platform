import * as Apollo from '@apollo/client'
import React from 'react'
import {
  JsonSchemaForm,
  JsonSchemaFormEvent,
  JsonSchemaFormProps,
} from '../json-schema'
import { ApolloFormProps } from './Form-apollo--types'

/**
 * Read to use form, can be used with modal or standalone
 */
export type FormUseCaseProps<TData extends object> = Pick<
  JsonSchemaFormProps<TData>,
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
