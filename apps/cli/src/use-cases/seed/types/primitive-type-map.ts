import {
  AntdDesignField,
  IAtomImport,
  TypeRef,
} from '@codelab/backend/abstract/core'
import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import { IPrimitiveTypeKind } from '@codelab/shared/abstract/core'

export const getPrimitiveTypeForApi = async (
  apiField: AntdDesignField,
  atom: IAtomImport,
): Promise<TypeRef> => {
  const PrimitiveType = await Repository.instance.PrimitiveType

  // Check and Create Primitive Type
  switch (apiField.type) {
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
      console.log(
        `Could not transform fields for Atom [${atom.type}]`,
        apiField,
      )

      return null
    }
  }
}
