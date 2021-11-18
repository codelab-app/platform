import {
  emptyJsonSchema,
  EmptyJsonSchemaType,
  FormUniforms,
  FormUniformsProps,
} from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useElementState } from '../../../hooks'

export type DeleteElementFormProps = Omit<
  FormUniformsProps<EmptyJsonSchemaType>,
  'schema'
>

export const DeleteElementForm = (props: DeleteElementFormProps) => {
  const { entity } = useElementState()

  return (
    <FormUniforms<EmptyJsonSchemaType>
      schema={emptyJsonSchema}
      data-testid="delete-component-element-form"
      id="delete-component-element-form"
      {...props}
    >
      <h4>
        Are you sure you want to delete{' '}
        {entity?.name ? `the element "${entity?.name}"` : 'that element'}?
      </h4>
      <AutoFields />
    </FormUniforms>
  )
}
