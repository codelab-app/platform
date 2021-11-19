import {
  emptyJsonSchema,
  EmptyJsonSchemaType,
  FormUniforms,
  FormUniformsProps,
} from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { usePropMapBindingState } from '../../../hooks'

export interface DeletePropMapBindingFormProps
  extends Omit<FormUniformsProps<EmptyJsonSchemaType>, 'schema'> {
  elementId: string
}

export const DeletePropMapBindingForm = ({
  elementId,
  ...props
}: DeletePropMapBindingFormProps) => {
  const { entity } = usePropMapBindingState()

  return (
    <FormUniforms<EmptyJsonSchemaType> schema={emptyJsonSchema} {...props}>
      <h4>
        Are you sure you want to delete the prop map binding "
        {entity?.sourceKey} - {entity?.targetKey}"?
      </h4>
      <AutoFields />
    </FormUniforms>
  )
}
