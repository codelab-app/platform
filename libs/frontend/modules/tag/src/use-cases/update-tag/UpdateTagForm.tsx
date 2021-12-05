import { FormUniforms } from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { UpdateTagFormProps, UpdateTagMutationInput } from './types'
import { updateTagSchema } from './updateTagSchema'

export const UpdateTagForm = (props: UpdateTagFormProps) => {
  return (
    <FormUniforms<UpdateTagMutationInput> schema={updateTagSchema} {...props}>
      <AutoFields />
    </FormUniforms>
  )
}
