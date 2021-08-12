import { TypeKind } from '@codelab/backend/abstract/types'
import {
  __EnumTypeValueFragment,
  CreateTypeInput,
  ElementTypeKind,
  PrimitiveKind,
} from '@codelab/shared/codegen/graphql'

export interface BaseTypeMutationSchema {
  name: string
  primitiveKind?: PrimitiveKind
  elementKind: ElementTypeKind
  allowedValues?: Array<__EnumTypeValueFragment>
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
  elementKind: {
    type: 'string',
    nullable: true,
    enum: Object.values(ElementTypeKind),
  },
  allowedValues: {
    type: 'array',
    nullable: true,
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          nullable: true,
          uniforms: {
            component: () => null,
          },
        },
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
    case TypeKind.InterfaceType:
      return { ...common, interfaceType: true }

    case TypeKind.EnumType:
      if (!typeSchema.allowedValues) {
        throw new Error('Invalid form input')
      }

      return {
        ...common,
        enumType: { allowedValues: typeSchema.allowedValues },
      }
    case TypeKind.PrimitiveType:
      if (!typeSchema.primitiveKind) {
        throw new Error('Invalid form input')
      }

      return {
        ...common,
        primitiveType: { primitiveKind: typeSchema.primitiveKind },
      }
    case TypeKind.LambdaType:
      return { ...common, lambdaType: true }
    case TypeKind.ComponentType:
      return { ...common, componentType: true }
    case TypeKind.ElementType:
      return { ...common, elementType: { kind: typeSchema.elementKind } }
  }

  throw new Error('Invalid form input')
}
