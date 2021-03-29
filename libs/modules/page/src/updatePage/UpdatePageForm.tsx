import React from 'react'
import {
  createNotificationHandler,
  JsonSchemaUniForm,
  PropsWithIds,
  UniFormUseCaseProps,
} from '@codelab/frontend/shared'
import { UpdatePageInput, UpdatePageSchema } from './updateFromSchema'
import {
  GetPageGql,
  useUpdatePageMutation,
  useGetPageQuery,
} from '@codelab/hasura'
import { DeepPartial } from 'uniforms'

export const UpdatePageForm = ({
  pageId,
  ...props
}: UniFormUseCaseProps<UpdatePageInput> & PropsWithIds<'pageId'>) => {
  const [mutate] = useUpdatePageMutation({
    refetchQueries: [
      {
        query: GetPageGql,
        variables: {
          pageId,
        },
      },
    ],
  })
  const { data, loading } = useGetPageQuery({
    variables: {
      pageId,
    },
  })

  const page = data?.page_by_pk

  if (loading) {
    return null
  }

  const onSubmit = (submitData: DeepPartial<UpdatePageInput>) => {
    return mutate({
      variables: {
        input: {
          ...(submitData as any),
        },
        pageId,
      },
    })
  }

  return (
    <JsonSchemaUniForm<UpdatePageInput>
      onSubmit={onSubmit}
      schema={UpdatePageSchema}
      model={{ name: page?.name }}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating page',
      })}
      {...props}
    />
  )
}
