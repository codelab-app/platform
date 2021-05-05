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
  useCreatePageMutation,
} from '@codelab/hasura'
import React, { useContext, useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { AutoFields } from 'uniforms-antd'
import { CreatePageInput, createPageSchema } from './createPageSchema'

type CreatePageFormProps = UniFormUseCaseProps<CreatePageInput>

export const CreatePageForm = (props: CreatePageFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.Page)
  const { appId } = useContext(AppContext)
  console.log(appId)

  const [mutate, { loading: creating }] = useCreatePageMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      refetchGetPagesListQuery({
        appId,
      }),
    ],
  })

  useEffect(() => {
    setLoading(creating)
  }, [creating])

  const onSubmit = (submitData: DeepPartial<CreatePageInput>) => {
    return mutate({
      variables: {
        data: {
          ...submitData,
          app_id: appId,
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
