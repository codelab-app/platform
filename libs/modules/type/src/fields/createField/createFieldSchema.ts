import {
  CreateFieldInput,
  PrimitiveType,
  Unit as UnitEnum,
} from '@codelab/graphql'

export enum TypeVariant {
  Array = 'Array',
  Interface = 'Object',
  Unit = 'Unit',
  Enum = 'Enum',
}

export interface CreateFieldTypeObject {
  type: TypeVariant | PrimitiveType
  allowedValues?: Array<string>
  allowedUnits?: Array<UnitEnum>
  interfaceId?: string
}

export type CreateFieldSchemaObject = Pick<
  CreateFieldInput,
  'key' | 'name' | 'description'
> &
  CreateFieldTypeObject & {
    arrayType: CreateFieldTypeObject
  }

let allTypeOptions: Array<PrimitiveType | TypeVariant> =
  Object.values(PrimitiveType)

allTypeOptions = [...allTypeOptions, ...Object.values(TypeVariant)]

const typePropertiesWithoutArray = (
  typeOptions: Array<PrimitiveType | TypeVariant>,
) => ({
  type: {
    type: 'string',
    enum: typeOptions,
  },
  allowedValues: {
    type: 'array',
    items: {
      type: 'string',
    },
  },
  interfaceId: {
    label: 'Interface',
    type: 'string',
  },
  allowedUnits: {
    type: 'array',
    items: {
      type: 'string',
      enum: Object.values(UnitEnum),
    },
  },
})

export const createFieldSchema = {
  title: 'Create Field Input',
  type: 'object',
  properties: {
    key: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string', nullable: true },
    ...typePropertiesWithoutArray(allTypeOptions),
    arrayType: {
      type: 'object',
      properties: {
        ...typePropertiesWithoutArray(
          allTypeOptions.filter((o) => o !== TypeVariant.Array),
        ),
      },
    },
  },
  required: ['type', 'key', 'name'],
}
