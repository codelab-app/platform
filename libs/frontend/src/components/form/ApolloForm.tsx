import * as Apollo from '@apollo/client'
import React, { useState } from 'react'
import { callCallbackOrArrayOfCallbacks } from '../../utils'
import { ApolloFormProps } from './ApolloForm.d'
import {
  JsonSchemaForm,
  JsonSchemaFormEvent,
  JsonSchemaUseCaseFormProps,
} from './json-schema'

export type ApolloFormUseCaseProps<TData extends object> = Omit<
  JsonSchemaUseCaseFormProps<TData>,
  'rjsfFormProps'
> &
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
    return (
      mutate({
        variables: {
          input: {
            ...submitData,
          },
        },
      })
        .then((r) => {
          // Pass up the event
          callCallbackOrArrayOfCallbacks(onSubmitSuccessfully, r)

          // Reset the form state
          setLocalFormData({ ...initialFormData })
        })
        // Pass up any errors too
        .catch((e) => {
          callCallbackOrArrayOfCallbacks(onSubmitFailed, e)
        })
    )
  }

  return (
    <JsonSchemaForm<TData>
      hideSubmitButton={hideSubmitButton}
      formData={localFormData}
      onChange={({ data: onChangeData }) => {
        setLocalFormData(onChangeData)
      }}
      onSubmit={onSubmit}
      {...props}
    />
  )
}
