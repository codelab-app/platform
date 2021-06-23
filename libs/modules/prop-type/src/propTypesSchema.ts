import { Prop_Type_Insert_Input } from '@codelab/codegen/hasura'
import { DeepNonNullable, ValueType } from '@codelab/frontend/shared'
import { JSONSchemaType } from 'ajv'

export type PropType = DeepNonNullable<
  Pick<Required<Prop_Type_Insert_Input>, 'is_array' | 'key' | 'value_type'>
>

export const propTypesSchema: JSONSchemaType<Array<PropType>> = {
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
      is_array: {
        type: 'boolean',
      },
    },
    required: ['key', 'value_type'],
  },
}
