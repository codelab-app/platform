import * as Apollo from '@apollo/client'
import React, { useState } from 'react'
import { ApolloFormProps } from './ApolloForm.d'
import {
  JsonSchemaForm,
  JsonSchemaFormEvent,
  JsonSchemaUseCaseFormProps,
} from './json-schema'

export type ApolloFormUseCaseProps<
  TData extends object
> = JsonSchemaUseCaseFormProps<TData> &
  Pick<ApolloFormProps<TData, any>, 'onSubmitFailed' | 'onSubmitSuccessfully'>

export const ApolloForm = <
  TData extends object,
  TVariable extends Apollo.OperationVariables
>({
  hideSubmitButton,
  mutate,
  initialFormData,
  onSubmitSuccessfully,
  onSubmitFailed,
  ...props
}: ApolloFormProps<TData, any>) => {
  const [localFormData, setLocalFormData] = useState<TData>(initialFormData)

  const onSubmit = ({ data: submitData }: JsonSchemaFormEvent<TData>) => {
    mutate({
      variables: {
        input: {
          ...submitData,
        },
      },
    })
      .then((r) => {
        // Pass up the event
        if (onSubmitSuccessfully) onSubmitSuccessfully(r)

        // Reset the form state
        setLocalFormData({ ...initialFormData })
      })
      // Pass up any errors too
      .catch(onSubmitFailed)
  }

  return (
    <JsonSchemaForm<TData>
      hideSubmitButton={hideSubmitButton}
      formData={localFormData}
      onChange={({ data: onChangeData }) => setLocalFormData(onChangeData)}
      onSubmit={onSubmit}
      {...props}
    />
  )
}
