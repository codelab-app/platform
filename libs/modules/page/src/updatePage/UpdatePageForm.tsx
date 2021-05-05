import {
  AppContext,
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  refetchGetPagesListQuery,
  useGetPageQuery,
  useUpdatePageMutation,
} from '@codelab/hasura'
import { Skeleton, Spin } from 'antd'
import React, { useContext, useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { AutoFields } from 'uniforms-antd'
import { UpdatePageInput, UpdatePageSchema } from './updateFromSchema'

type UpdatePageFormProps = UniFormUseCaseProps<UpdatePageInput>

export const UpdatePageForm = (props: UpdatePageFormProps) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Page)
  const { appId } = useContext(AppContext)
  const { updateId: updatePageId } = state

  console.log(appId)

  const [mutate, { loading: updating }] = useUpdatePageMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetPagesListQuery({ appId })],
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
      <Skeleton active loading>
        <AutoFields />
      </Skeleton>
    </FormUniforms>
  )
}
