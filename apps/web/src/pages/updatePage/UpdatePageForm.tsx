import React from 'react'
import { ApolloForm, JsonSchemaUseCaseFormProps } from '@codelab/frontend'
import {
  CreatePageMutationVariables,
  GetPageGql,
  UpdatePageInputSchema,
  useUpdatePageMutation,
} from '@codelab/generated'
import { UpdatePageInput } from 'libs/modules/page/src/core/application/useCases/updatePage/UpdatePageInput'

export const UpdatePageForm = ({
  pageId,
  ...props
}: JsonSchemaUseCaseFormProps<UpdatePageInput> & { pageId: string }) => {
  const [mutate] = useUpdatePageMutation({
    refetchQueries: [
      {
        query: GetPageGql,
        variables: {
          input: {
            pageId,
          },
        },
      },
    ],
  })

  return (
    <ApolloForm<UpdatePageInput, CreatePageMutationVariables>
      key={pageId}
      mutate={mutate}
      schema={UpdatePageInputSchema}
      rjsfFormProps={{
        uiSchema: {
          appId: {
            'ui:disabled': 'appId',
          },
        },
      }}
      initialFormData={{ title: '', pageId }}
      {...props}
    />
  )
}
