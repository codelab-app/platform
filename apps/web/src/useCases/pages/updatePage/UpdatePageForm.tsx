import React from 'react'
import {
  ApolloForm,
  FormUseCaseProps,
  PropsWithIds,
} from '@codelab/frontend/shared'
import {
  CreatePageMutationVariables,
  GetPageGql,
  UpdatePageInputSchema,
  useGetPageQuery,
  useUpdatePageMutation,
} from '@codelab/generated'

export const UpdatePageForm = ({
  pageId,
  ...props
}: FormUseCaseProps<any> & PropsWithIds<'pageId'>) => {
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
  const { data, loading } = useGetPageQuery({
    variables: {
      input: {
        pageId,
      },
    },
  })

  const page = data?.getPage

  if (loading) {
    return null
  }

  return (
    <ApolloForm<any, CreatePageMutationVariables>
      key={pageId}
      mutate={mutate}
      hideSubmitButton
      schema={UpdatePageInputSchema}
      uiSchema={{
        appId: {
          'ui:disabled': 'appId',
        },
      }}
      initialFormData={{ title: page?.title, pageId }}
      idPrefix="update_page"
      {...props}
    />
  )
}
