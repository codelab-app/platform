import {
  AntdDesignField,
  IAtomImport,
  TypeRef,
} from '@codelab/backend/abstract/core'
import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import { IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import { FieldTypeRef } from '../utils/type-predicates'

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
