import React, { useContext, useEffect } from 'react'
import {
  AppContext,
  createNotificationHandler,
  EntityType,
  JsonSchemaUniForm,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'

import { GetPagesListGql, useCreatePageMutation } from '@codelab/hasura'
import { createPageSchema, CreatePageInput } from './createPageSchema'
import { DeepPartial } from 'uniforms'
import { useCurrentUser } from '@codelab/modules/user'
import { AutoFields } from 'uniforms-antd'
type CreatePageFormProps = UniFormUseCaseProps<CreatePageInput>

export const CreatePageForm = (props: CreatePageFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.Page)

  const { appId } = useContext(AppContext)

  const [mutate, { loading: creating }] = useCreatePageMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetPagesListGql,
        variables: {
          appId,
        },
      },
    ],
  })

  useEffect(() => {
    setLoading(creating)
  }, [creating])

  const { userId } = useCurrentUser()

  const onSubmit = (submitData: DeepPartial<CreatePageInput>) => {
    return mutate({
      variables: {
        data: {
          ...submitData,
          app_id: appId,
          user_id: userId,
        },
      },
    })
  }
  return (
    <JsonSchemaUniForm<CreatePageInput>
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
    </JsonSchemaUniForm>
  )
}
