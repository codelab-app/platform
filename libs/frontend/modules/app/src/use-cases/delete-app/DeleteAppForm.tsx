import { FormUniforms } from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { deleteAppSchema } from './deleteAppSchema'
import { DeleteAppFormProps, DeleteAppMutationInput } from './types'

export const DeleteAppForm = ({ name, ...props }: DeleteAppFormProps) => (
  <FormUniforms<DeleteAppMutationInput> schema={deleteAppSchema} {...props}>
    <h4>Are you sure you want to delete app "{name}"?</h4>
    <AutoFields omitFields={['appId']} />
  </FormUniforms>
)
