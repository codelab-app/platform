import {
  emptyJsonSchema,
  EmptyJsonSchemaType,
  FormUniforms,
  FormUniformsProps,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useTypeState } from '../../../hooks'

type DeleteTypeFormProps = Omit<
  FormUniformsProps<EmptyJsonSchemaType>,
  'schema'
>

export const DeleteTypeForm = (props: DeleteTypeFormProps) => {
  const { entity } = useTypeState()

  return (
    <FormUniforms<EmptyJsonSchemaType> schema={emptyJsonSchema} {...props}>
      <h4>Are you sure you want to delete type "{entity?.name}"?</h4>
    </FormUniforms>
  )
}
