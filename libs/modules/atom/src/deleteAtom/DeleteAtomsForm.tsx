import {
  refetchGetAtomsQuery,
  useDeleteAtomMutation,
} from '@codelab/codegen/graphql'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalForm,
} from '@codelab/frontend/shared'
import React, { useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'
import { DeleteAtomInput, deleteAtomSchema } from './deleteAtomSchema'

type DeleteAtomFormProps = UniFormUseCaseProps<DeleteAtomInput>

export const DeleteAtomsForm = (props: DeleteAtomFormProps) => {
  const { reset, setLoading, state } = useCrudModalForm(EntityType.Atom)
  const { deleteIds: atomIds, metadata } = state

  const [mutate, { loading: deleting }] = useDeleteAtomMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetAtomsQuery()],
  })

  useEffect(() => {
    setLoading(deleting)
  }, [deleting, setLoading])

  const onSubmit = () => {
    return mutate({
      variables: {
        input: {
          atomId: atomIds[0],
        },
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
      <h4>Are you sure you want to delete atom "{metadata?.label}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
