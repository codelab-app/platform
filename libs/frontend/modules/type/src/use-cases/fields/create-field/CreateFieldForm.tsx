import {
  FormUniforms,
  FormUniformsProps,
} from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { TypeSelect } from '../../../shared'
import { CreateFieldSchema, createFieldSchema } from './createFieldSchema'

export const CreateFieldForm = (
  props: Omit<FormUniformsProps<CreateFieldSchema>, 'schema'>,
) => {
  return (
    <FormUniforms<CreateFieldSchema> schema={createFieldSchema} {...props}>
      <AutoFields omitFields={['typeId']} />
      <TypeSelect name="typeId" label={'Type'} />
    </FormUniforms>
  )
}
