import {
  refetchGetAtomsQuery,
  useDeleteAtomMutation,
  useGetAtomsQuery,
} from '@codelab/dgraph'
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
import { DeleteAtomInput, deleteAtomSchema } from './deleteAtomSchema'

type DeleteAtomFormProps = UniFormUseCaseProps<DeleteAtomInput>

export const DeleteAtomsForm = (props: DeleteAtomFormProps) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Atom)

  const [mutate, { loading: deleting }] = useDeleteAtomMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetAtomsQuery()],
  })

  const filter = {
    id: state.deleteIds,
  }

  useEffect(() => {
    setLoading(deleting)
  }, [deleting])

  const { data, loading } = useGetAtomsQuery({
    variables: { filter },
  })

  const atomTypes = data?.queryAtom?.map((atom) => atom?.label).join(', ')

  if (loading) {
    return <Spin />
  }

  const onSubmit = () => {
    return mutate({
      variables: { filter },
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
      <h4>Are you sure you want to delete atom "{atomTypes}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
