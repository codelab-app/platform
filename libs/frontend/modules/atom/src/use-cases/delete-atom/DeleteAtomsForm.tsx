import { FormUniforms } from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { deleteAtomSchema } from './deleteAtomSchema'
import { DeleteAtomFormProps, DeleteAtomMutationInput } from './types'

export const DeleteAtomForm = ({ name, ...props }: DeleteAtomFormProps) => (
  <FormUniforms<DeleteAtomMutationInput> schema={deleteAtomSchema} {...props}>
    <h4>Are you sure you want to delete atom "{name}"?</h4>
    <AutoFields omitFields={['atomId']} />
  </FormUniforms>
)
