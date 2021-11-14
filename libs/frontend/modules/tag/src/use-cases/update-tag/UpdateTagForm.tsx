import {
  FormUniforms,
  FormUniformsProps,
} from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { UpdateTagSchema, updateTagSchema } from './updateTagSchema'

export const UpdateTagForm = (
  props: Omit<FormUniformsProps<UpdateTagSchema>, 'schema'>,
) => {
  return (
    <FormUniforms<UpdateTagSchema> schema={updateTagSchema} {...props}>
      <AutoFields />
    </FormUniforms>
  )
}
