import {
  emptyJsonSchema,
  EmptyJsonSchemaType,
  FormUniforms,
  FormUniformsProps,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useSelector } from 'react-redux'
import { AutoFields } from 'uniforms-antd'
import { selectPropMapBinding } from '../../../store'

export interface DeletePropMapBindingFormProps
  extends Omit<FormUniformsProps<EmptyJsonSchemaType>, 'schema'> {
  elementId: string
}

export const DeletePropMapBindingForm = ({
  elementId,
  ...props
}: DeletePropMapBindingFormProps) => {
  const { entity } = useSelector(selectPropMapBinding)

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
