import { DeepNonNullable } from '@codelab/frontend/shared'
import { Prop_Type_C_Insert_Input } from '@codelab/hasura'
import { JSONSchemaType } from 'ajv'
import { PropType, PropTypesSchema } from '../PropTypesSchema'

export type CreatePropTypeCInput = DeepNonNullable<
  Pick<Required<Prop_Type_C_Insert_Input>, 'label' | 'library_id'> & {
    propTypes: Array<PropType>
  }
>

export const createPropTypeCSchema: JSONSchemaType<CreatePropTypeCInput> = {
  title: 'Create PropType Collection',
  type: 'object',
  properties: {
    label: {
      type: 'string',
    },
    library_id: {
      type: 'string',
    },
    propTypes: PropTypesSchema,
  },
  required: ['label', 'library_id'],
} as const
