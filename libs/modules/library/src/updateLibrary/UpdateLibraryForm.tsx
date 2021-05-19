import { useUser } from '@auth0/nextjs-auth0'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  refetchGetLibraryQuery,
  useGetLibraryQuery,
  useUpdateLibraryMutation,
} from '@codelab/hasura'
import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { AutoFields } from 'uniforms-antd'
import { UpdateLibraryInput, UpdateLibrarySchema } from './updateLibrarySchema'

type UpdateLibraryFormProps = UniFormUseCaseProps<UpdateLibraryInput>

export const UpdateLibraryForm = (props: UpdateLibraryFormProps) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Library)
  const { updateId: updateLibraryId } = state

  const [mutate, { loading: updating }] = useUpdateLibraryMutation({
    refetchQueries: [
      refetchGetLibraryQuery({
        libraryId: updateLibraryId,
      }),
    ],
  })

  useEffect(() => {
    setLoading(updating)
  }, [updating])

  const { data, loading } = useGetLibraryQuery({
    variables: {
      libraryId: updateLibraryId,
    },
  })

  const library = data?.library_by_pk
  const { user } = useUser()
  const userId = user?.sub

  if (loading) {
    return <Spin />
  }

  const onSubmit = (submitData: DeepPartial<UpdateLibraryInput>) => {
    return mutate({
      variables: {
        input: {
          user_id: userId,
          ...(submitData as any),
        },
        libraryId: updateLibraryId,
      },
    })
  }

  return (
    <FormUniforms<UpdateLibraryInput>
      onSubmit={onSubmit}
      schema={UpdateLibrarySchema}
      model={{ name: library?.name ?? '' }}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating library',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
