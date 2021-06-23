import {
  refetchLibraryExplorerQuery,
  useDeleteLibraryMutation,
  useGetLibraryQuery,
} from '@codelab/codegen/hasura'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'
import { DeleteLibraryInput, DeleteLibrarySchema } from './deleteLibrarySchema'

type DeleteLibraryFormProps = UniFormUseCaseProps<DeleteLibraryInput>

export const DeleteLibraryForm = (props: DeleteLibraryFormProps) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Library)
  const { deleteIds: deleteLibraryIds } = state

  const [mutate, { loading: deleting }] = useDeleteLibraryMutation({
    refetchQueries: [refetchLibraryExplorerQuery()],
  })

  useEffect(() => {
    setLoading(deleting)
  }, [deleting])

  const { data, loading } = useGetLibraryQuery({
    variables: {
      libraryId: deleteLibraryIds[0],
    },
  })

  const library = data?.library_by_pk

  if (loading) {
    return <Spin />
  }

  const onSubmit = () => {
    return mutate({
      variables: {
        libraryId: deleteLibraryIds[0],
      },
    })
  }

  return (
    <FormUniforms<DeleteLibraryInput>
      onSubmit={onSubmit}
      schema={DeleteLibrarySchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting library',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>Are you sure you want to delete library "{library?.name}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
