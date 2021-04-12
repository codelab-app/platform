import React, { useEffect } from 'react'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { UpdateLibraryInput, UpdateLibrarySchema } from './updateLibrarySchema'
import {
  GetLibraryGql,
  useUpdateLibraryMutation,
  useGetLibraryQuery,
} from '@codelab/hasura'
import { DeepPartial } from 'uniforms'
import { Spin } from 'antd'
import { AutoFields } from 'uniforms-antd'
import { useCurrentUser } from '@codelab/modules/user'

type UpdateLibraryFormProps = UniFormUseCaseProps<UpdateLibraryInput>

export const UpdateLibraryForm = (props: UpdateLibraryFormProps) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Library)
  const { id: libraryId } = state

  const [mutate, { loading: updating }] = useUpdateLibraryMutation({
    refetchQueries: [
      {
        query: GetLibraryGql,
        variables: {
          libraryId,
        },
      },
    ],
  })

  useEffect(() => {
    setLoading(updating)
  }, [updating])

  const { data, loading } = useGetLibraryQuery({
    variables: {
      libraryId,
    },
  })

  const library = data?.library_by_pk

  const { userId } = useCurrentUser()

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
        libraryId,
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
