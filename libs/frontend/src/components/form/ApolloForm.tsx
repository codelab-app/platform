import * as Apollo from '@apollo/client'
import React, { useState } from 'react'
import { ApolloFormProps } from './ApolloForm.d'
import { JsonSchemaForm } from './json-schema/JsonSchemaForm'
import { JsonSchemaFormEvent } from './json-schema/JsonSchemaForm.d'

export const ApolloForm = <
  TData extends object,
  TVariable extends Apollo.OperationVariables
>({
  useMutation,
  formData,
  ...props
}: ApolloFormProps<TData, any>) => {
  const [localFormData, setLocalFormData] = useState<TData>(formData)

  const onSubmit = ({ data: submitData }: JsonSchemaFormEvent<TData>) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [mutate, { data, loading, error }] = useMutation({
      variables: {
        input: {
          ...submitData,
        },
      },
    })

    mutate()
  }

  return (
    <JsonSchemaForm<TData>
      {...props}
      hideSubmitButton
      formData={localFormData}
      onChange={({ data: onChangeData }) => setLocalFormData(onChangeData)}
      onSubmit={onSubmit}
    />
  )
}
