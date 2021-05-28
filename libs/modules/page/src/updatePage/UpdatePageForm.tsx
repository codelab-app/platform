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
  useGetPageQuery,
  useUpdatePageMutation,
} from '@codelab/graphql'
import React, { useContext, useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'
import { updatePageSchema, UpdatePageSchemaType } from './updatePageSchema'

type UpdatePageFormProps = UniFormUseCaseProps<UpdatePageSchemaType>

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

  const onSubmit = (submitData: UpdatePageSchemaType) => {
    return mutate({
      variables: {
        input: {
          pageId: updatePageId,
          updateData: {
            appId: data?.page?.app.id as string,
            ...submitData,
          },
        },
      },
    })
  }

  return (
    <FormUniforms<UpdatePageSchemaType>
      onSubmit={onSubmit}
      schema={updatePageSchema}
      model={{ name: data?.page?.name }}
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
