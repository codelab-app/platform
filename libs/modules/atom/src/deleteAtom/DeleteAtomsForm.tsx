import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  refetchLibraryExplorerQuery,
  useDeleteAtomsWhereMutation,
  useGetAtomsWhereQuery,
} from '@codelab/hasura'
import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'
import { DeleteAtomInput, deleteAtomSchema } from './deleteAtomSchema'

type DeleteAtomFormProps = UniFormUseCaseProps<DeleteAtomInput>

export const DeleteAtomsForm = (props: DeleteAtomFormProps) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Atom)

  const [mutate, { loading: deleting }] = useDeleteAtomsWhereMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchLibraryExplorerQuery()],
  })

  const atomsWhere = {
    _or: state.deleteIds.map((id) => ({
      id: {
        _eq: id,
      },
    })),
  }

  useEffect(() => {
    setLoading(deleting)
  }, [deleting])

  const { data, loading } = useGetAtomsWhereQuery({
    variables: {
      where: atomsWhere,
    },
  })

  const atomTypes = data?.atom.map((atom) => atom.type.label).join(', ')

  if (loading) {
    return <Spin />
  }

  const onSubmit = () => {
    return mutate({
      variables: {
        where: atomsWhere,
      },
    })
  }

  return (
    <FormUniforms<DeleteAtomInput>
      data-testid="delete-atom-form"
      id="delete-atom-form"
      onSubmit={onSubmit}
      schema={deleteAtomSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting atom',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>Are you sure you want to delete atoms "{atomTypes}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
