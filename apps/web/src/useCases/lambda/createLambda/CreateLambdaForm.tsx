import React, { useContext } from 'react'
import { AppContext } from '../../apps/AppProvider'
import { ApolloForm, FormUseCaseProps } from '@codelab/frontend'
import {
  CreateLambdaInputSchema,
  CreateLambdaMutationVariables,
  GetAppGql,
  useCreateLambdaMutation,
} from '@codelab/generated'
import { CreateLambdaInput } from 'libs/modules/lambda/src/core/application/useCases/createLambda/CreateLambdaInput'

export const CreateLambdaForm = (
  props: FormUseCaseProps<CreateLambdaInput>,
) => {
  const { appId } = useContext(AppContext)
  const [mutate] = useCreateLambdaMutation({
    refetchQueries: [
      {
        query: GetAppGql,
        variables: {
          input: {
            appId,
          },
        },
      },
    ],
  })

  return (
    <ApolloForm<CreateLambdaInput, CreateLambdaMutationVariables>
      hideSubmitButton
      schema={CreateLambdaInputSchema}
      mutate={mutate}
      uiSchema={{
        appId: {
          'ui:disabled': 'appId',
        },
      }}
      initialFormData={{ appId, name: '', body: '' }}
      {...props}
    />
  )
}
