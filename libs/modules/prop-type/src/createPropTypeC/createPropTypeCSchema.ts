import { DeepNonNullable } from '@codelab/frontend/shared'
import { Prop_Type_C_Insert_Input } from '@codelab/hasura'
import { JSONSchemaType } from 'ajv'
import { PropType, propTypesSchema } from '../propTypesSchema'

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
    propTypes: propTypesSchema,
  },
  required: ['label', 'library_id'],
} as const
