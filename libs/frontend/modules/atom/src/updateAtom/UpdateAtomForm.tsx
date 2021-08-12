import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import {
  CreateAtomInput,
  refetchGetAtomsQuery,
  useUpdateAtomMutation,
} from '@codelab/shared/codegen/graphql'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { UpdateAtomInput, updateAtomSchema } from './updateAtomSchema'

export const UpdateAtomForm = (props: UniFormUseCaseProps<UpdateAtomInput>) => {
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
    mapVariables: ({ name, type }: CreateAtomInput, state) => ({
      input: { id: state.updateId, data: { name, type } },
    }),
  })

  return (
    <FormUniforms<UpdateAtomInput>
      data-testid="update-atom-form"
      id="update-atom-form"
      onSubmit={handleSubmit}
      schema={updateAtomSchema}
      model={{ type: metadata?.type, name: metadata?.name }}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating Atom',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
