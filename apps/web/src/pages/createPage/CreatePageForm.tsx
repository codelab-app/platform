import { useRouter } from 'next/router'
import React from 'react'
import { ApolloForm, JsonSchemaUseCaseFormProps } from '@codelab/frontend'
import {
  CreatePageInputSchema,
  CreatePageMutationVariables,
  GetPagesGql,
  useCreatePageMutation,
} from '@codelab/generated'
import { CreatePageInput } from 'libs/modules/page/src/core/application/useCases/createPage/CreatePageInput'

export const CreatePageForm = (
  props: JsonSchemaUseCaseFormProps<CreatePageInput>,
) => {
  const { query } = useRouter()
  const appId = `${query.appId}`

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
      mutate={mutate}
      schema={CreatePageInputSchema}
      rjsfFormProps={{
        uiSchema: {
          appId: {
            'ui:disabled': 'appId',
          },
        },
      }}
      initialFormData={{ title: '', appId }}
      {...props}
    />
  )
}
