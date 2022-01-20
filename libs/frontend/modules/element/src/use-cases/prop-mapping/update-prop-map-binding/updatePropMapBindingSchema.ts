import { UpdatePropMapBindingData } from '@codelab/shared/abstract/codegen'
import { JSONSchemaType } from 'ajv'

export const updatePropMapBindingSchema: JSONSchemaType<UpdatePropMapBindingData> =
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
