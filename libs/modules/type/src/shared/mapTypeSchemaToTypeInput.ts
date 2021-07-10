import { CreateTypeInput, PrimitiveKind } from '@codelab/codegen/graphql'

/**
 * This is the version of TypeModels that we present to the Ui, for simplicity
 */
export enum TypeKind {
  Interface = 'Object',
  Array = 'Array',
  Enum = 'Enum',
  Primitive = 'Primitive',
}

export interface BaseTypeMutationSchema {
  name: string
  primitiveKind?: PrimitiveKind
  allowedValues?: Array<{ name?: string | null; value: string }>
}

export const baseTypeMutationSchemaProperties = {
  name: {
    type: 'string',
  },
  primitiveKind: {
    type: 'string',
    nullable: true,
    enum: Object.values(PrimitiveKind),
  },
  allowedValues: {
    type: 'array',
    nullable: true,
    items: {
      type: 'object',
      properties: {
        name: { type: 'string', nullable: true },
        value: { type: 'string' },
      },
      required: ['value'],
    },
  },
}

export const mapTypeSchemaToTypeInput = (
  kind: TypeKind,
  typeSchema: BaseTypeMutationSchema,
): CreateTypeInput => {
  const common: Pick<CreateTypeInput, 'name'> = { name: typeSchema.name }

  switch (kind) {
    case TypeKind.Interface:
      return { ...common, interfaceType: true }
    case TypeKind.Enum:
      if (!typeSchema.allowedValues) {
        throw new Error('Invalid form input')
      }

      return {
        ...common,
        enumType: { allowedValues: typeSchema.allowedValues },
      }
    case TypeKind.Primitive:
      if (!typeSchema.primitiveKind) {
        throw new Error('Invalid form input')
      }

      return {
        ...common,
        primitiveType: { primitiveKind: typeSchema.primitiveKind },
      }
  }

  throw new Error('Invalid form input')
}
