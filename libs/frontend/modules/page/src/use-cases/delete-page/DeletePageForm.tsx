import { FormUniforms } from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { deletePageSchema } from './deletePageSchema'
import { DeletePageFormProps, DeletePageMutationInput } from './types'

export const DeletePageForm = ({ name, ...props }: DeletePageFormProps) => (
  <FormUniforms<DeletePageMutationInput> schema={deletePageSchema} {...props}>
    <h4>Are you sure you want to delete page "{name}"?</h4>
    <AutoFields omitFields={['pageId']} />
  </FormUniforms>
)
