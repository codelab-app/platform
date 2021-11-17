import { FormUniforms } from '@codelab/frontend/view/components'
import React from 'react'
import { deleteLambdaSchema } from './deleteLambdaSchema'
import { DeleteLambdaFormProps, DeleteLambdaMutationInput } from './types'

export const DeleteLambdaForm = ({ name, ...props }: DeleteLambdaFormProps) => {
  return (
    <FormUniforms<DeleteLambdaMutationInput>
      schema={deleteLambdaSchema}
      {...props}
    >
      <h4>Are you sure you want to delete lambda "{name}"?</h4>
    </FormUniforms>
  )
}
