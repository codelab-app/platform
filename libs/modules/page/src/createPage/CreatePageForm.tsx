import React from 'react'
import {
  createNotificationHandler,
  JsonSchemaUniForm,
  PropsWithIds,
  UniFormUseCaseProps,
} from '@codelab/frontend/shared'

import { GetPagesListGql, useCreatePageMutation } from '@codelab/hasura'
import { createPageSchema, CreatePageInput } from './createPageSchema'
import { DeepPartial } from 'uniforms'
import { useCurrentUser } from '@codelab/modules/user'

type CreatePageFormProps = UniFormUseCaseProps<CreatePageInput> &
  PropsWithIds<'appId'>

export const CreatePageForm = ({ appId, ...props }: CreatePageFormProps) => {
  const [mutate] = useCreatePageMutation({
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

  const { userId } = useCurrentUser()
  const onSubmit = (submitData: DeepPartial<CreatePageInput>) => {
    return mutate({
      variables: {
        data: {
          ...(submitData as any),
          app_id: appId,
          owner_id: userId,
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
      {...props}
    />
  )
}
