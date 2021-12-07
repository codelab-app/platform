import { DeleteTagsInput } from '@codelab/frontend/abstract/codegen'
import { FormUniforms } from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { deleteTagsSchema } from './deleteTagsSchema'
import { DeleteFromProps } from './types'

export const DeleteTagsForm = (props: DeleteFromProps) => {
  return (
    <FormUniforms<DeleteTagsInput> schema={deleteTagsSchema} {...props}>
      <AutoFields />
    </FormUniforms>
  )
}
