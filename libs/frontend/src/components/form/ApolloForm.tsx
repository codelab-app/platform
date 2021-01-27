import React, { useState } from 'react'
import { ApolloFormProps } from './ApolloForm.d'
import { JsonSchemaForm } from './json-schema/JsonSchemaForm'

export const ApolloForm = <TData extends object, TVariable extends object>({
  useMutation,
  formData,
  variables,
  ...props
}: ApolloFormProps<TData, TVariable>) => {
  const [localFormData, setLocalFormData] = useState<TData>(formData)

  const [mutation, { data, loading, error }] = useMutation({
    variables,
  })

  return (
    <JsonSchemaForm<TData>
      {...props}
      formData={localFormData}
      onChange={({ data: onChangeData }) => setLocalFormData(onChangeData)}
      onSubmit={(vals) => {
        console.log(vals)
      }}
    />
  )
}
