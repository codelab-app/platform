import {
  FormUniforms,
  FormUniformsProps,
} from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import {
  createComponentSchema,
  CreateComponentSchemaType,
} from './createComponentSchema'

type CreateComponentFormProps = Omit<
  FormUniformsProps<CreateComponentSchemaType>,
  'schema'
>

export const CreateComponentForm = (props: CreateComponentFormProps) => {
  return (
    <FormUniforms<CreateComponentSchemaType>
      schema={createComponentSchema}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
