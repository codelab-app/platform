import { PrimitiveTypeOGM, UnionTypeOGM } from '@codelab/backend/adapter/neo4j'
import {
  IAtomExport,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { connectTypeId } from '@codelab/shared/data'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { v4 } from 'uuid'
import { AntdDesignApi } from './../data/ant-design.data'

// Function to check PrimitiveType of value
export const checkPrimitiveType = (value: string) => {
  switch (value) {
    case 'boolean':
      return IPrimitiveTypeKind.Boolean
    case 'string':
      return IPrimitiveTypeKind.String
    default:
      return IPrimitiveTypeKind.Float
  }
}

const allPrimitives = ['number', 'string', 'boolean']

type TypeRef = {
  existingId: string
} | null

export const getPrimitiveTypeForApi = async (
  apiField: AntdDesignApi,
  atom: IAtomExport,
  userId: string,
  values: Array<string>,
): Promise<TypeRef> => {
  const PrimitiveType = await PrimitiveTypeOGM()
  const UnionType = await UnionTypeOGM()

  const containsPrimitives: boolean = values.every((x) =>
    allPrimitives.includes(x),
  )

  const checkPrimitiveOfUnionType = (data: Array<string>) => {
    if (containsPrimitives && data.length > 1) {
      return connectUnionType(data)
    } else {
      return null
    }
  }

  // Async function to connect Union Type
  /**
   *This is a function to create Union Type, but it's a Union Type of Primitive Type
   *
   * Example: string | number, number | boolean ...
   *
   * The function will create a union type, then connect to Primitive Type
   * */
  const connectUnionType = async (data: Array<string>) => {
    // Check if enum has been created already
    const [existingUnion] = await UnionType.find({
      where: {
        AND: [
          {
            name: `${atom.name} ${pascalCaseToWords(
              apiField.property,
            )} Union API`,
          },
        ],
      },
    })

    // If not exist
    if (!existingUnion) {
      const unionName = `${atom.name} ${pascalCaseToWords(
        apiField.property,
      )} Union API`

      console.log(`Creating union ${unionName}`)

      // create Union Type
      const {
        unionTypes: [unionType],
      } = await UnionType.create({
        input: [
          {
            id: v4(),
            name: unionName,
            kind: ITypeKind.UnionType,
            typesOfUnionType: {
              PrimitiveType: {
                // connect to Primitive Type
                connect: data.map((value) => ({
                  where: {
                    node: {
                      name: checkPrimitiveType(value),
                    },
                  },
                })),
              },
            },
            owner: connectTypeId(userId),
          },
        ],
      })

      return {
        existingId: unionType.id,
      }
    }

    return {
      existingId: existingUnion.id,
    }
  }

  //
  await checkPrimitiveOfUnionType(values)

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
