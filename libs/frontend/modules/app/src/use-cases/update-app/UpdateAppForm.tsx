import { FormUniforms } from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { UpdateAppFormProps, UpdateAppMutationInput } from './types'
import { updateAppSchema } from './updateAppSchema'

export const UpdateAppForm = (props: UpdateAppFormProps) => {
  return (
    <FormUniforms<UpdateAppMutationInput> schema={updateAppSchema} {...props}>
      <AutoFields />
    </FormUniforms>
  )
}
