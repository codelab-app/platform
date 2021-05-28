import {
  AppContext,
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  refetchGetPagesQuery,
  UpdatePageData,
  useGetPageQuery,
  useUpdatePageMutation,
} from '@codelab/graphql'
import React, { useContext, useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'
import { updatePageSchema } from './updatePageSchema'

type UpdatePageFormProps = UniFormUseCaseProps<UpdatePageData>

export const UpdatePageForm = (props: UpdatePageFormProps) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Page)
  const { app } = useContext(AppContext)
  const { updateId: updatePageId } = state

  const [mutate, { loading: updating }] = useUpdatePageMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetPagesQuery({ input: { appId: app.id } })],
  })

  useEffect(() => {
    setLoading(updating)
  }, [updating])

  const { data } = useGetPageQuery({
    variables: {
      input: { pageId: updatePageId },
    },
  })

  const onSubmit = (submitData: UpdatePageData) => {
    return mutate({
      variables: {
        input: {
          pageId: updatePageId,
          updateData: {
            ...submitData,
          },
        },
      },
    })
  }

  return (
    <FormUniforms<UpdatePageData>
      onSubmit={onSubmit}
      schema={updatePageSchema}
      model={{ name: data?.page?.name, appId: data?.page?.app.id }}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating page',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields omitFields={['appId']} />
    </FormUniforms>
  )
}
