import * as Apollo from '@apollo/client'
import { ISubmitEvent } from '@rjsf/core'
import React from 'react'
import { JsonSchemaForm, JsonSchemaFormProps } from '../json-schema'
import { ApolloFormProps } from './Form-apollo--types'

/**
 * Read to use form, can be used with modal or standalone
 */
export type FormUseCaseProps<TData extends Record<string, unknown>> = Pick<
  JsonSchemaFormProps<TData>,
  'onSubmitError' | 'onSubmitSuccess' | 'submitRef' | 'saveOnChange'
>

export const ApolloForm = <
  TData extends Record<string, unknown>,
  TVariable extends Apollo.OperationVariables
>({
  hideSubmitButton,
  mutate,
  saveOnChange,
  ...props
}: ApolloFormProps<TData, any>) => {
  const onSubmit = ({ formData: submitData }: Partial<ISubmitEvent<TData>>) => {
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
      saveOnChange={saveOnChange}
      {...props}
    />
  )
}
