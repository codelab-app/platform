import React, { useContext } from 'react'
import {
  ApolloForm,
  AppContext,
  FormUseCaseProps,
} from '@codelab/frontend/shared'
import {
  CreateLambdaInputSchema,
  CreateLambdaMutationVariables,
  GetAppGql,
  useCreateLambdaMutation,
} from '@codelab/generated'

export const CreateLambdaForm = (props: FormUseCaseProps<any>) => {
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
    <ApolloForm<any, CreateLambdaMutationVariables>
      // hideSubmitButton
      schema={CreateLambdaInputSchema}
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
      initialFormData={{ appId, name: '', body: '' }}
      {...props}
      idPrefix="create_lambda"
    />
  )
}
