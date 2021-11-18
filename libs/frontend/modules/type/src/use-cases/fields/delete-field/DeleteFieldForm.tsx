import {
  emptyJsonSchema,
  EmptyJsonSchemaType,
  FormUniforms,
  FormUniformsProps,
} from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useFieldState } from '../../../hooks'

type DeleteFieldFormProps = Omit<
  FormUniformsProps<EmptyJsonSchemaType>,
  'schema'
>

export const DeleteFieldForm = (props: DeleteFieldFormProps) => {
  const { entity } = useFieldState()

  return (
    <FormUniforms<EmptyJsonSchemaType> schema={emptyJsonSchema} {...props}>
      <h4>Are you sure you want to delete field "{entity?.name}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
