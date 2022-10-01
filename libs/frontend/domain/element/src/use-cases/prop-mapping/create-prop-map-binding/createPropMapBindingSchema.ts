import { ICreatePropMapBindingDTO } from '@codelab/shared/abstract/core'
import { JSONSchemaType } from 'ajv'
import { HiddenField } from 'uniforms-antd'

export const createPropMapBindingSchema: JSONSchemaType<ICreatePropMapBindingDTO> =
  {
    title: 'Create Prop Map Binding Input',
    type: 'object',
    properties: {
      elementId: {
        type: 'string',
        component: HiddenField,
      },
      sourceKey: {
        autoFocus: true,
        type: 'string',
      },
      targetKey: {
        type: 'string',
      },
      targetElementId: {
        type: 'string',
        nullable: true,
        label: 'Target Element',
        help: 'Leave blank to target the current element',
      },
    },
    required: ['elementId', 'sourceKey', 'targetKey'],
  }
