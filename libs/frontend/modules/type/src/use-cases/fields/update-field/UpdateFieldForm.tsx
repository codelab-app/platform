import {
  FormUniforms,
  FormUniformsProps,
} from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { TypeSelect } from '../../../shared'
import { UpdateFieldSchema, updateFieldSchema } from './updateFieldSchema'

export const UpdateFieldForm = (
  props: Omit<FormUniformsProps<UpdateFieldSchema>, 'schema'>,
) => {
  return (
    <FormUniforms<UpdateFieldSchema> schema={updateFieldSchema} {...props}>
      <AutoFields fields={['key', 'name', 'description']} />
      <TypeSelect name={'typeId'} label={'Type'} />
    </FormUniforms>
  )
}
