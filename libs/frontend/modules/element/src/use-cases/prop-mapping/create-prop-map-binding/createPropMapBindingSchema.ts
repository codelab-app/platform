import { JSONSchemaType } from 'ajv'
import { HiddenField } from 'uniforms-antd'
import { CreatePropMapBindingMutationVariables } from './CreatePropMapBinding.api.graphql.gen'

export type CreatePropMapBindingSchema =
  CreatePropMapBindingMutationVariables['input']

export const createPropMapBindingSchema: JSONSchemaType<CreatePropMapBindingSchema> =
  {
    title: 'Create Prop Map Binding Input',
    type: 'object',
    properties: {
      elementId: {
        type: 'string',
        component: HiddenField,
      },
      sourceKey: {
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
    required: ['elementId', 'sourceKey', 'targetKey'],
  }
