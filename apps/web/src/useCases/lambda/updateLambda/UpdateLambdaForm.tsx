import React from 'react'
import { ApolloForm, FormUseCaseProps } from '@codelab/frontend'
import {
  LambdaFragmentsFragment,
  UpdateLambdaInputSchema,
  UpdateLambdaMutationVariables,
  useUpdateLambdaMutation,
} from '@codelab/generated'
import { UpdateLambdaInput } from 'libs/modules/lambda/src/core/application/useCases/updateLambda/UpdateLambdaInput'

type UpdateLambdaFormProps = {
  lambda: LambdaFragmentsFragment | undefined
} & FormUseCaseProps<UpdateLambdaInput>

export const UpdateLambdaForm = ({
  lambda,
  ...props
}: UpdateLambdaFormProps) => {
  const [mutate] = useUpdateLambdaMutation()

  if (!lambda) {
    return null
  }

  return (
    <ApolloForm<UpdateLambdaInput, UpdateLambdaMutationVariables>
      hideSubmitButton
      schema={UpdateLambdaInputSchema}
      mutate={mutate}
      uiSchema={{
        appId: {
          'ui:disabled': 'appId',
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
