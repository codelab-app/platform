import React, { useEffect } from 'react'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { useUser } from '@auth0/nextjs-auth0'
import { GetLibrariesListGql, useCreateLibraryMutation } from '@codelab/hasura'
import { createLibrarySchema, CreateLibraryInput } from './createLibrarySchema'
import { DeepPartial } from 'uniforms'

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

  const userId = useUser().user?.sub
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
    <FormUniforms<CreateLibraryInput>
      onSubmit={onSubmit}
      schema={createLibrarySchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating library',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    />
  )
}
