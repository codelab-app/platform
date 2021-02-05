import React from 'react'
import { ApolloForm, FormUseCaseProps, PropsWithIds } from '@codelab/frontend'
import {
  CreatePageInputSchema,
  CreatePageMutationVariables,
  GetPagesGql,
  useCreatePageMutation,
} from '@codelab/generated'
import { CreatePageInput } from 'libs/modules/page/src/core/application/useCases/createPage/CreatePageInput'

type CreatePageFormProps = FormUseCaseProps<CreatePageInput> &
  PropsWithIds<'appId'>

export const CreatePageForm = ({ appId, ...props }: CreatePageFormProps) => {
  const [mutate] = useCreatePageMutation({
    refetchQueries: [
      {
        query: GetPagesGql,
        variables: {
          input: {
            appId,
          },
        },
      },
    ],
  })

  return (
    <ApolloForm<CreatePageInput, CreatePageMutationVariables>
      {...props}
      mutate={mutate}
      hideSubmitButton
      schema={CreatePageInputSchema}
      rjsfFormProps={{
        uiSchema: {
          appId: {
            'ui:disabled': 'appId',
          },
        },
      }}
      initialFormData={{ title: '', appId }}
    />
  )
}
