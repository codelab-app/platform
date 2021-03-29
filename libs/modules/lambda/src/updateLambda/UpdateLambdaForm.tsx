import React from 'react'
import { ApolloForm, FormUseCaseProps } from '@codelab/frontend/shared'
import {
  LambdaFragmentsFragment,
  UpdateLambdaInputSchema,
  UpdateLambdaMutationVariables,
  useUpdateLambdaMutation,
} from '@codelab/generated'

type UpdateLambdaFormProps = {
  lambda: LambdaFragmentsFragment | undefined
} & FormUseCaseProps<any>

export const UpdateLambdaForm = ({
  lambda,
  ...props
}: UpdateLambdaFormProps) => {
  const [mutate] = useUpdateLambdaMutation()

  if (!lambda) {
    return null
  }

  return (
    <ApolloForm<any, UpdateLambdaMutationVariables>
      hideSubmitButton
      schema={UpdateLambdaInputSchema}
      mutate={mutate}
      uiSchema={{
        appId: {
          'ui:disabled': 'appId',
        },
        body: {
          'ui:widget': 'textarea',
          'ui:options': {
            rows: 5,
          },
        },
      }}
      initialFormData={{
        lambdaId: lambda.id,
        name: lambda.name,
        body: lambda.body,
      }}
      idPrefix="update_lambda"
      {...props}
    />
  )
}
