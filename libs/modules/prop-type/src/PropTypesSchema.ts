import { DeepNonNullable, ValueType } from '@codelab/frontend/shared'
import { Prop_Type_Insert_Input } from '@codelab/hasura'
import { JSONSchemaType } from 'ajv'

export type PropType = DeepNonNullable<
  Pick<Required<Prop_Type_Insert_Input>, 'isArray' | 'key' | 'value_type'>
>

export const PropTypesSchema: JSONSchemaType<Array<PropType>> = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
      },
      value_type: {
        type: 'string',
        enum: Object.values(ValueType),
      },
      isArray: {
        type: 'boolean',
      },
    },
    required: ['key', 'value_type'],
  },
}
