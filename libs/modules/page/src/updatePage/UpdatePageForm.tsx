import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  GetPageGql,
  useGetPageQuery,
  useUpdatePageMutation,
} from '@codelab/hasura'
import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { AutoFields } from 'uniforms-antd'
import { UpdatePageInput, UpdatePageSchema } from './updateFromSchema'

type UpdatePageFormProps = UniFormUseCaseProps<UpdatePageInput>

export const UpdatePageForm = (props: UpdatePageFormProps) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Page)
  const { updateId: updatePageId } = state

  const [mutate, { loading: updating }] = useUpdatePageMutation({
    refetchQueries: [
      {
        query: GetPageGql,
        variables: {
          pageId: updatePageId,
        },
      },
    ],
  })

  useEffect(() => {
    setLoading(updating)
  }, [updating])

  const { data, loading } = useGetPageQuery({
    variables: {
      pageId: updatePageId,
    },
  })

  const page = data?.page_by_pk

  if (loading) {
    return <Spin />
  }

  const onSubmit = (submitData: DeepPartial<UpdatePageInput>) => {
    return mutate({
      variables: {
        input: {
          ...(submitData as any),
        },
        pageId: updatePageId,
      },
    })
  }

  return (
    <FormUniforms<UpdatePageInput>
      onSubmit={onSubmit}
      schema={UpdatePageSchema}
      model={{ name: page?.name }}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating page',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
