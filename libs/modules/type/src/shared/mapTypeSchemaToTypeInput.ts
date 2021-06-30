import { CreateTypeInput, PrimitiveType } from '@codelab/codegen/graphql'

export enum TypeKind {
  Interface = 'Object',
  Array = 'Array',
  Enum = 'Enum',
  Simple = 'Primitive',
}

export interface BaseTypeMutationSchema {
  name: string
  primitiveType?: PrimitiveType
  allowedValues?: Array<{ name?: string | null; value: string }>
}

export const baseTypeMutationSchemaProperties = {
  name: {
    type: 'string',
  },
  primitiveType: {
    type: 'string',
    nullable: true,
    enum: Object.values(PrimitiveType),
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
    case TypeKind.Simple:
      if (!typeSchema.primitiveType) {
        throw new Error('Invalid form input')
      }

      return {
        ...common,
        simpleType: { primitiveType: typeSchema.primitiveType },
      }
  }

  throw new Error('Invalid form input')
}
