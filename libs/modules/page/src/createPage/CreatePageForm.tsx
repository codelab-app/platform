import React from 'react'
import {
  ApolloForm,
  FormUseCaseProps,
  PropsWithIds,
} from '@codelab/frontend/shared'
import {
  CreatePageInputSchema,
  CreatePageMutationVariables,
  GetAppGql,
  useCreatePageMutation,
} from '@codelab/generated'

type CreatePageFormProps = FormUseCaseProps<any> & PropsWithIds<'appId'>

export const CreatePageForm = ({ appId, ...props }: CreatePageFormProps) => {
  const [mutate] = useCreatePageMutation({
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
    <ApolloForm<any, CreatePageMutationVariables>
      {...props}
      mutate={mutate}
      hideSubmitButton
      schema={CreatePageInputSchema}
      uiSchema={{
        appId: {
          'ui:disabled': 'appId',
        },
      }}
      initialFormData={{ title: '', appId }}
      idPrefix="create_page"
    />
  )
}
