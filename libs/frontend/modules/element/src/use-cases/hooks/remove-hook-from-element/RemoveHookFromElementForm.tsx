import {
  emptyJsonSchema,
  EmptyJsonSchemaType,
  FormUniforms,
  FormUniformsProps,
} from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useHookState } from '../../../hooks/useHookState'

export type RemoveHookFromElementFormProps = Omit<
  FormUniformsProps<EmptyJsonSchemaType>,
  'schema'
>

export const RemoveHookFromElementForm = (
  props: RemoveHookFromElementFormProps,
) => {
  const { entity } = useHookState()

  return (
    <FormUniforms<EmptyJsonSchemaType> schema={emptyJsonSchema} {...props}>
      <h4>Are you sure you want to remove the hook "{entity?.type}"</h4>
      <AutoFields />
    </FormUniforms>
  )
}
