import { FormUniforms } from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { UpdatePageFormProps, UpdatePageMutationInput } from './types'
import { updatePageSchema } from './updatePageSchema'

export const UpdatePageForm = (props: UpdatePageFormProps) => {
  return (
    <FormUniforms<UpdatePageMutationInput> schema={updatePageSchema} {...props}>
      <AutoFields omitFields={['appId']} />
    </FormUniforms>
  )
}
