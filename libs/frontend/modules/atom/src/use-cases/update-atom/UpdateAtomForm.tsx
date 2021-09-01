import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { refetchGetAtomsQuery } from '../get-atoms/GetAtoms.api.graphql'
import { useUpdateAtomMutation } from './UpdateAtom.api.graphql'
import { UpdateAtomSchema, updateAtomSchema } from './updateAtomSchema'

export const UpdateAtomForm = (
  props: UniFormUseCaseProps<UpdateAtomSchema>,
) => {
  const {
    handleSubmit,
    crudModal: {
      reset,
      state: { metadata },
    },
  } = useCrudModalMutationForm({
    entityType: EntityType.Atom,
    useMutationFunction: useUpdateAtomMutation,
    mutationOptions: {
      refetchQueries: [refetchGetAtomsQuery()],
    },
    mapVariables: ({ name, type }: UpdateAtomSchema, state) => ({
      input: { id: state.updateId, data: { name, type } },
    }),
  })

  return (
    <FormUniforms<UpdateAtomSchema>
      data-testid="update-atom-form"
      id="update-atom-form"
      onSubmit={handleSubmit}
      schema={updateAtomSchema}
      model={{
        type: metadata?.type,
        name: metadata?.name,
      }}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating Atom',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields omitFields={['api']} />
    </FormUniforms>
  )
}
