import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  GetLibrariesGql,
  useDeleteAtomTypesWhereMutation,
  useGetAtomTypesQuery,
} from '@codelab/hasura'
import React, { useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'
import {
  DeleteAtomTypeInput,
  deleteAtomTypeSchema,
} from './deleteAtomTypeSchema'

type DeleteAtomTypeProps = UniFormUseCaseProps<DeleteAtomTypeInput>

export const DeleteAtomTypesForm = (props: DeleteAtomTypeProps) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.AtomType)

  const [mutate, { loading: deleting }] = useDeleteAtomTypesWhereMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GetLibrariesGql,
      },
    ],
  })

  const atomTypesWhere = {
    _or: state.deleteIds.map((id) => ({
      id: {
        _eq: id,
      },
    })),
  }

  const { data, loading } = useGetAtomTypesQuery()
  const atomTypes = data?.atom_type.map((atomType) => atomType.label).join(', ')

  useEffect(() => {
    setLoading(deleting)
  }, [deleting])

  const onSubmit = () => {
    return mutate({
      variables: {
        where: atomTypesWhere,
      },
    })
  }

  return (
    <FormUniforms<DeleteAtomTypeInput>
      data-testid="delete-atomType-form"
      id="delete-atomType-form"
      onSubmit={onSubmit}
      schema={deleteAtomTypeSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting AtomType',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>Are you sure you want to delete atoms "{atomTypes}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
