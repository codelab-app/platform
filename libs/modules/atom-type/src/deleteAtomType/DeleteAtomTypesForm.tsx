import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  GetAtomTypesGql,
  useDeleteAtomTypesWhereMutation,
  useGetAtomTypesWhereQuery,
} from '@codelab/hasura'
import { Spin } from 'antd'
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
        query: GetAtomTypesGql,
      },
    ],
    context: {
      headers: {
        'X-Hasura-Role': 'admin',
      },
    },
  })

  const atomTypesWhere = {
    _or: state.deleteIds.map((id) => ({
      id: {
        _eq: id,
      },
    })),
  }

  const { data, loading } = useGetAtomTypesWhereQuery({
    variables: {
      where: atomTypesWhere,
    },
  })

  useEffect(() => {
    setLoading(deleting)
  }, [deleting])

  if (loading) {
    return <Spin />
  }

  const atomTypes = data?.atom_type.map((atomType) => atomType.label).join(', ')

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
