import { FormUniforms } from '@codelab/frontend/view/components'
import { AtomType } from '@codelab/shared/abstract/core'
import React from 'react'
import { AutoFields, SelectField } from 'uniforms-antd'
import { createAtomSchema } from './createAtomSchema'
import { CreateAtomFormProps, CreateAtomMutationInput } from './types'

const atomTypeOptions = Object.keys(AtomType).map((atomType) => ({
  label: atomType,
  value: atomType,
}))

export const CreateAtomForm = ({ ...props }: CreateAtomFormProps) => {
  return (
    <FormUniforms<CreateAtomMutationInput> schema={createAtomSchema} {...props}>
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
