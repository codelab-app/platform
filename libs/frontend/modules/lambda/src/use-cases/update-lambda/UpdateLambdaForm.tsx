import { FormUniforms } from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { UpdateLambdaFormProps, UpdateLambdaMutationInput } from './types'
import { updateLambdaSchema } from './updateLambdaSchema'

export const UpdateLambdaForm = (props: UpdateLambdaFormProps) => {
  return (
    <FormUniforms<UpdateLambdaMutationInput>
      schema={updateLambdaSchema}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
