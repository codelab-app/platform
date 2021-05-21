import { useUser } from '@auth0/nextjs-auth0'
import {
  refetchLibraryExplorerQuery,
  useCreateLibraryMutation,
} from '@codelab/dgraph'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import React, { useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'
import { CreateLibraryInput, createLibrarySchema } from './createLibrarySchema'

type CreateLibraryFormProps = UniFormUseCaseProps<CreateLibraryInput>

export const CreateLibraryForm = ({ ...props }: CreateLibraryFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.Library)
  const { user } = useUser()

  const [mutate, { loading: creating }] = useCreateLibraryMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchLibraryExplorerQuery()],
  })

  useEffect(() => {
    setLoading(creating)
  }, [creating])

  const onSubmit = (submitData: CreateLibraryInput) => {
    if (!user?.email) {
      throw new Error('Missing user email')
    }

    return mutate({
      variables: {
        input: {
          name: submitData.name,
          ownerId: user?.email,
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
    >
      <AutoFields />
    </FormUniforms>
  )
}
