import { DeepNonNullable } from '@codelab/frontend/shared'
import {
  Prop_Type_C_Insert_Input,
  Prop_Type_Insert_Input,
} from '@codelab/hasura'
import { JSONSchemaType } from 'ajv'
import { propTypesSchema } from '../propTypesSchema'

export type UpdatePropTypeCInput = DeepNonNullable<
  Pick<Required<Prop_Type_C_Insert_Input>, 'label' | 'library_id' | 'id'> & {
    propTypes: Array<
      DeepNonNullable<
        Pick<
          Required<Prop_Type_Insert_Input>,
          'is_array' | 'key' | 'value_type'
        >
      >
    >
  }
>

export const updatePropTypeCSchema: JSONSchemaType<UpdatePropTypeCInput> = {
  title: 'Update PropTypeC',
  type: 'object',
  properties: {
    label: {
      type: 'string',
    },
    id: {
      type: 'string',
    },
    library_id: {
      type: 'string',
    },
    propTypes: propTypesSchema,
  },
  required: ['label'],
}
