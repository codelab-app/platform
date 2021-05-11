import {
  refetchGetPagesListQuery,
  useGetPageQuery,
  useUpdatePageMutation,
} from '@codelab/dgraph'
import {
  AppContext,
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import React, { useContext, useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'
import { UpdatePageInput, updatePageSchema } from './updatePageSchema'

type UpdatePageFormProps = UniFormUseCaseProps<UpdatePageInput>

export const UpdatePageForm = (props: UpdatePageFormProps) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Page)
  const { app } = useContext(AppContext)
  const { updateId: updatePageId } = state

  const [mutate, { loading: updating }] = useUpdatePageMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetPagesListQuery({ appId: app.id })],
  })

  useEffect(() => {
    setLoading(updating)
  }, [updating])

  const { data, loading } = useGetPageQuery({
    variables: {
      pageId: updatePageId,
    },
  })

  const onSubmit = (submitData: UpdatePageInput) => {
    return mutate({
      variables: {
        input: {
          ...submitData,
        },
        pageId: updatePageId,
      },
    })
  }

  return (
    <FormUniforms<UpdatePageInput>
      onSubmit={onSubmit}
      schema={updatePageSchema}
      model={{ title: data?.page?.title }}
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
