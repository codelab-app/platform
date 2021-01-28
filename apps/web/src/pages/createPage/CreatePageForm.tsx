import { useRouter } from 'next/router'
import React from 'react'
import { ApolloForm } from '../../../../../libs/frontend/src/components/form/ApolloForm'
import { useCreatePageMutation } from '../../../../../libs/generated/src/graphql.generated'
import { JsonSchemaUseCaseFormProps } from '@codelab/frontend'
import {
  CreatePageInputSchema,
  CreatePageMutationVariables,
  GetPagesGql,
} from '@codelab/generated'
import { CreatePageInput } from 'libs/modules/page/src/core/application/useCases/createPage/CreatePageInput'

export const CreatePageForm = (
  props: JsonSchemaUseCaseFormProps<CreatePageInput>,
) => {
  const { query } = useRouter()
  const appId = `${query.appId}`

  return (
    <ApolloForm<CreatePageInput, CreatePageMutationVariables>
      mutation={useCreatePageMutation({
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
      })}
      schema={CreatePageInputSchema}
      rjsfFormProps={{
        uiSchema: {
          appId: {
            'ui:disabled': 'appId',
          },
        },
      }}
      formData={{ title: '', appId }}
      {...props}
    />
  )
}
