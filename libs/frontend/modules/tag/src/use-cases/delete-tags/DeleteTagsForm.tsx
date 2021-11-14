import { DeleteTagsInput } from '@codelab/frontend/abstract/codegen'
import {
  FormUniforms,
  FormUniformsProps,
} from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { DeleteTagsSchema, deleteTagsSchema } from './deleteTagsSchema'

export const DeleteTagsForm = (
  props: Omit<FormUniformsProps<DeleteTagsSchema>, 'schema'>,
) => {
  return (
    <FormUniforms<DeleteTagsInput> schema={deleteTagsSchema} {...props}>
      <AutoFields />
    </FormUniforms>
  )
}
