import * as Apollo from '@apollo/client'
import React, { useState } from 'react'
import { ApolloFormProps } from './ApolloForm.d'
import { JsonSchemaForm } from './json-schema/JsonSchemaForm'
import { JsonSchemaFormEvent } from './json-schema/JsonSchemaForm.d'

export const ApolloForm = <
  TData extends object,
  TVariable extends Apollo.OperationVariables
>({
  mutation,
  formData,
  ...props
}: ApolloFormProps<TData, any>) => {
  const [localFormData, setLocalFormData] = useState<TData>(formData)
  const [mutate, { data, loading, error }] = mutation

  const onSubmit = ({ data: submitData }: JsonSchemaFormEvent<TData>) => {
    mutate({
      variables: {
        input: {
          ...submitData,
        },
      },
    })
  }

  return (
    <JsonSchemaForm<TData>
      hideSubmitButton
      formData={localFormData}
      onChange={({ data: onChangeData }) => setLocalFormData(onChangeData)}
      onSubmit={onSubmit}
      {...props}
    />
  )
}
