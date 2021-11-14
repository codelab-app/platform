import { FormUniforms } from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { createAppSchema } from './createAppSchema'
import { CreateAppFormProps, CreateAppMutationInput } from './types'

export const CreateAppForm = (props: CreateAppFormProps) => (
  <FormUniforms<CreateAppMutationInput> schema={createAppSchema} {...props}>
    <AutoFields />
  </FormUniforms>
)
