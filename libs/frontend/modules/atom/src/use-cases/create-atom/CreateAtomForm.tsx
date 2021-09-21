import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import { AtomType } from '@codelab/shared/abstract/core'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { refetchGetAtomsQuery } from '../get-atoms/GetAtoms.web.graphql.gen'
import { useCreateAtomMutation } from './create-atom.web.graphql.gen'
import { CreateAtomSchema, createAtomSchema } from './createAtomSchema'

type CreateAtomFormProps = UniFormUseCaseProps<CreateAtomSchema>

const atomTypeOptions = Object.keys(AtomType).map((atomType) => ({
  label: atomType,
  value: atomType,
}))

export const CreateAtomForm = ({ ...props }: CreateAtomFormProps) => {
  const {
    handleSubmit,
    crudModal: { reset },
  } = useCrudModalMutationForm({
    entityType: EntityType.Atom,
    useMutationFunction: useCreateAtomMutation,
    mutationOptions: {
      refetchQueries: [refetchGetAtomsQuery()],
    },
    mapVariables: ({ name, type }: CreateAtomSchema) => ({
      input: { name, type },
    }),
  })

  return (
    <FormUniforms<CreateAtomSchema>
      onSubmit={handleSubmit}
      schema={createAtomSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating atom',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields omitFields={['type', 'api']} />
      <SelectField
        name="type"
        label="Type"
        showSearch={true}
        optionFilterProp="label"
        options={atomTypeOptions}
      />
    </FormUniforms>
  )
}
