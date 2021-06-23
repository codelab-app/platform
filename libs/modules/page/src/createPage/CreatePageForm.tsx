import {
  refetchGetPagesQuery,
  useCreatePageMutation,
} from '@codelab/codegen/graphql'
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
import { createPageSchema, CreatePageSchemaType } from './createPageSchema'

type CreatePageFormProps = UniFormUseCaseProps<CreatePageSchemaType>

export const CreatePageForm = (props: CreatePageFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.Page)
  const { app } = useContext(AppContext)

  const [mutate, { loading: creating }] = useCreatePageMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetPagesQuery({ input: { appId: app.id } })],
  })

  useEffect(() => {
    setLoading(creating)
  }, [creating])

  const onSubmit = (submitData: CreatePageSchemaType) => {
    return mutate({
      variables: {
        input: {
          ...submitData,
          appId: app.id,
        },
      },
    })
  }

  return (
    <FormUniforms<CreatePageSchemaType>
      onSubmit={onSubmit}
      schema={createPageSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating page',
      })}
      onSubmitSuccess={() => {
        reset()
      }}
      {...props}
    >
      <AutoFields omitFields={['appId']} />
    </FormUniforms>
  )
}
