import { PrimitiveType, Unit as UnitEnum } from '@codelab/graphql'
import { JTDDataType } from 'ajv/dist/jtd'

export enum TypeVariant {
  Array = 'Array',
  Interface = 'Object',
  Unit = 'Unit',
  Enum = 'Enum',
}

let typeOptions: Array<string> = Object.values(PrimitiveType)
typeOptions = [...typeOptions, ...Object.values(TypeVariant)]

export const createFieldSchema = {
  title: 'Create Field Input',
  type: 'object',
  properties: {
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
  },
  required: ['type'],
}

export type CreateFieldSchemaType = JTDDataType<typeof createFieldSchema>
