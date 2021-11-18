import {
  emptyJsonSchema,
  EmptyJsonSchemaType,
  FormUniforms,
  FormUniformsProps,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useSelector } from 'react-redux'

type DeleteTypeFormProps = Omit<
  FormUniformsProps<EmptyJsonSchemaType>,
  'schema'
>

export const DeleteTypeForm = (props: DeleteTypeFormProps) => {
  const entity = useSelector((s) => s.type.entity)

  return (
    <FormUniforms<EmptyJsonSchemaType> schema={emptyJsonSchema} {...props}>
      <h4>Are you sure you want to delete type "{entity?.name}"?</h4>
    </FormUniforms>
  )
}
