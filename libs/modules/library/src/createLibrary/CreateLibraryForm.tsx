import React, { useEffect } from 'react'
import {
  createNotificationHandler,
  EntityType,
  JsonSchemaUniForm,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { GetLibrariesListGql, useCreateLibraryMutation } from '@codelab/hasura'
import { createLibrarySchema, CreateLibraryInput } from './createLibrarySchema'
import { DeepPartial } from 'uniforms'
import { AutoFields } from 'uniforms-antd'
import { useCurrentUser } from '@codelab/modules/user'

type CreateLibraryFormProps = UniFormUseCaseProps<CreateLibraryInput>

export const CreateLibraryForm = ({ ...props }: CreateLibraryFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.Library)

  const [mutate, { loading: creating }] = useCreateLibraryMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetLibrariesListGql,
      },
    ],
  })

  useEffect(() => {
    setLoading(creating)
  }, [creating])

  const { userId } = useCurrentUser()
  const onSubmit = (submitData: DeepPartial<CreateLibraryInput>) => {
    return mutate({
      variables: {
        data: {
          ...(submitData as any),
          user_id: userId,
        },
      },
    })
  }

  return (
    <JsonSchemaUniForm<CreateLibraryInput>
      onSubmit={onSubmit}
      schema={createLibrarySchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating library',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields />
    </JsonSchemaUniForm>
  )
}
