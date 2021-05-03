import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  GetAtomsListGql,
  useDeleteAtomMutation,
  useGetAtomQuery,
} from '@codelab/hasura'
import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'
import { DeleteAtomInput, DeleteAtomSchema } from './deleteAtomSchema'

type DeleteAtomFormProps = UniFormUseCaseProps<DeleteAtomInput>

export const DeleteAtomForm = (props: DeleteAtomFormProps) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Atom)
  const { deleteIds: deleteAtomIds } = state

  const [mutate, { loading: deleting }] = useDeleteAtomMutation({
    refetchQueries: [
      {
        query: GetAtomsListGql,
      },
    ],
  })
  useEffect(() => {
    setLoading(deleting)
  }, [deleting])

  const { data, loading } = useGetAtomQuery({
    variables: {
      atomId: deleteAtomIds[0],
    },
  })

  const atom = data?.atom_by_pk

  if (loading) {
    return <Spin />
  }

  const onSubmit = () => {
    return mutate({
      variables: {
        atomId: deleteAtomIds[0],
      },
    })
  }

  return (
    <FormUniforms<DeleteAtomInput>
      data-testid="delete-atom-form"
      id="delete-atom-form"
      onSubmit={onSubmit}
      schema={DeleteAtomSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting atom',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>Are you sure you want to delete atom "{atom?.type}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
