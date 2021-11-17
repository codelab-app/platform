import { FormUniforms } from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { deleteAtomSchema } from './deleteAtomSchema'
import { DeleteAtomMutationInput, DeleteAtomsFormProps } from './types'

export const DeleteAtomsForm = ({ name, ...props }: DeleteAtomsFormProps) => (
  <FormUniforms<DeleteAtomMutationInput> schema={deleteAtomSchema} {...props}>
    <h4>Are you sure you want to delete atom "{name}"?</h4>
    <AutoFields omitFields={['atomId']} />
  </FormUniforms>
)
