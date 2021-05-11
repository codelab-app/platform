import {
  refetchGetPagesListQuery,
  useCreatePageMutation,
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
import { CreatePageInput, createPageSchema } from './createPageSchema'

type CreatePageFormProps = UniFormUseCaseProps<CreatePageInput>

export const CreatePageForm = (props: CreatePageFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.Page)
  const { app } = useContext(AppContext)

  const [mutate, { loading: creating }] = useCreatePageMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      refetchGetPagesListQuery({
        appId: app.id,
      }),
    ],
  })

  useEffect(() => {
    setLoading(creating)
  }, [creating])

  const onSubmit = (submitData: CreatePageInput) => {
    return mutate({
      variables: {
        input: {
          ...submitData,
          app: {
            id: app.id,
          },
        },
      },
    })
  }

  return (
    <FormUniforms<CreatePageInput>
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
      <AutoFields />
    </FormUniforms>
  )
}
