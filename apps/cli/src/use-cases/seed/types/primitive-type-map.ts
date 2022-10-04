import { PrimitiveTypeOGM } from '@codelab/backend/adapter/neo4j'
import {
  AntdDesignApi,
  IAtomImport,
  IPrimitiveTypeKind,
} from '@codelab/shared/abstract/core'

type TypeRef = {
  existingId: string
} | null

export const getPrimitiveTypeForApi = async (
  apiField: AntdDesignApi,
  atom: IAtomImport,
): Promise<TypeRef> => {
  const PrimitiveType = await PrimitiveTypeOGM()

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
      // console.log('=========')

      // console.log(
      //   `Could not transform fields for Atom [${atom.type}]`,
      //   apiField,
      // )

      // console.log('=========')

      return null
    }
  }
}
