import { FormUniforms } from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { createLambdaSchema } from './createLambdaSchema'
import { CreateLambdaFormProps, CreateLambdaMutationInput } from './types'

export const CreateLambdaForm = (props: CreateLambdaFormProps) => {
  return (
    <FormUniforms<CreateLambdaMutationInput>
      schema={createLambdaSchema}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
