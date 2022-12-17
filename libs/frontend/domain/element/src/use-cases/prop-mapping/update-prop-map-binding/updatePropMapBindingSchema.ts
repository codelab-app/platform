import type { IUpdatePropMapBindingDTO } from '@codelab/frontend/abstract/core'
import type { JSONSchemaType } from 'ajv'

export const updatePropMapBindingSchema: JSONSchemaType<IUpdatePropMapBindingDTO> =
  {
    title: 'Update Prop Map Binding Input',
    type: 'object',
    properties: {
      sourceKey: {
        autoFocus: true,
        type: 'string',
      },
      targetElementId: {
        type: 'string',
        nullable: true,
        label: 'Target Element',
      },
      targetKey: {
        type: 'string',
      },
    },
    required: ['sourceKey', 'targetKey'],
  }
