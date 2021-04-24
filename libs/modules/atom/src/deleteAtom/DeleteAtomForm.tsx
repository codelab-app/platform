import React, { useEffect } from 'react'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
} from '@codelab/frontend/shared'
import { DeleteAtomInput, DeleteAtomSchema } from './deleteAtomSchema'
import {
  useDeleteAtomMutation,
  GetAtomsListGql,
  useGetAtomQuery,
} from '@codelab/hasura'
import { useCRUDModalForm } from '@codelab/frontend/shared'
import { Spin } from 'antd'
import { AutoFields } from 'uniforms-antd'
type DeleteAtomFormProps = UniFormUseCaseProps<DeleteAtomInput>

export const DeleteAtomForm = (props: DeleteAtomFormProps) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Atom)
  const { id: atomId } = state

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
      atomId,
    },
  })

  const atom = data?.atom_by_pk

  if (loading) {
    return <Spin />
  }

  const onSubmit = () => {
    return mutate({
      variables: {
        atomId,
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
