import { DeepNonNullable } from '@codelab/frontend/shared'
import {
  Prop_Type_C_Insert_Input,
  Prop_Type_Insert_Input,
} from '@codelab/hasura'
import { JSONSchemaType } from 'ajv'
import { PropTypesSchema } from '../PropTypesSchema'

export type UpdatePropTypeCInput = DeepNonNullable<
  Pick<Required<Prop_Type_C_Insert_Input>, 'label' | 'library_id' | 'id'> & {
    propTypes: Array<
      DeepNonNullable<
        Pick<Required<Prop_Type_Insert_Input>, 'isArray' | 'key' | 'value_type'>
      >
    >
  }
>

export const UpdatePropTypeCSchema: JSONSchemaType<UpdatePropTypeCInput> = {
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
    propTypes: PropTypesSchema,
  },
  required: ['label'],
}
