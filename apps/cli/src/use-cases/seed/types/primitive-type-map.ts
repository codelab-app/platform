import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import { IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import type { FieldTypeRef } from '../utils/type-predicates'

export const getPrimitiveTypeForApi: FieldTypeRef = async ({ field, atom }) => {
  const PrimitiveType = await Repository.instance.PrimitiveType

  // Check and Create Primitive Type
  switch (field.type) {
    case 'boolean': {
      const [booleanType] = await PrimitiveType.find({
        where: {
          name: IPrimitiveTypeKind.Boolean,
        },
      })

      if (!booleanType) {
        throw new Error('Boolean type not found')
      }

      return {
        existingId: booleanType.id,
      }
    }

    case 'number': {
      const [floatType] = await PrimitiveType.find({
        where: {
          name: IPrimitiveTypeKind.Float,
        },
      })

      if (!floatType) {
        throw new Error('Boolean type not found')
      }

      return {
        existingId: floatType.id,
      }
    }

    // eslint-disable-next-line no-fallthrough
    case 'string': {
      const [stringType] = await PrimitiveType.find({
        where: {
          name: IPrimitiveTypeKind.String,
        },
      })

      if (!stringType) {
        throw new Error('Primitive type not found')
      }

      return {
        existingId: stringType.id,
      }
    }

    default: {
      console.log(`Could not transform fields for Atom [${atom.type}]`, field)

      return null
    }
  }
}
