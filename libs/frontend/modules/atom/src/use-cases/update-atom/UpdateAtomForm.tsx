import { FormUniforms } from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { UpdateAtomFormProps, UpdateAtomMutationInput } from './types'
import { updateAtomSchema } from './updateAtomSchema'

export const UpdateAtomForm = (props: UpdateAtomFormProps) => {
  return (
    <FormUniforms<UpdateAtomMutationInput>
      data-testid="update-atom-form"
      id="update-atom-form"
      schema={updateAtomSchema}
      {...props}
    >
      <AutoFields omitFields={['api']} />
    </FormUniforms>
  )
}
