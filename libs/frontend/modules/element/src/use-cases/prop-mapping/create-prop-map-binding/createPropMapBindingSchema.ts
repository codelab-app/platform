import { CreatePropMapBindingInput } from '@codelab/shared/abstract/codegen'
import { JSONSchemaType } from 'ajv'
import { HiddenField } from 'uniforms-antd'
import { CreatePropMapBindingMutationVariables } from '../../../graphql/prop-map-binding.endpoints.graphql.gen'

export const createPropMapBindingSchema: JSONSchemaType<CreatePropMapBindingInput> =
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
