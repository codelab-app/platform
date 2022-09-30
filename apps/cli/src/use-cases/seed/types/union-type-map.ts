import { UnionTypeOGM } from '@codelab/backend/adapter/neo4j'
import {
  AntdDesignApi,
  IAtomImport,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { connectTypeId } from '@codelab/shared/data'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { v4 } from 'uuid'
import { findUnionType } from '../utils/isRenderPropType'

const checkType = (value: string) => {
  return value === 'boolean' || value === 'number' || value === 'string'
}

const checkInterfaceType = (value: string) => {
  return value.includes('{')
}

const allPrimitives = ['number', 'string', 'boolean']

// Function to check PrimitiveType of value
const checkPrimitiveType = (value: string) => {
  switch (value?.trim()) {
    case 'boolean':
      return IPrimitiveTypeKind.Boolean
    case 'string':
      return IPrimitiveTypeKind.String
    case 'ReactNode':
      return ITypeKind.ReactNodeType
    case 'number':
      return IPrimitiveTypeKind.Float
    case 'integer':
      return IPrimitiveTypeKind.Integer
    default:
      console.log(`Not Found Type Of [${value}]`)

      return null
  }
}

type TypeRef = {
  existingId: string
} | null

export const getUnionTypeForApi = async (
  apiField: AntdDesignApi,
  atom: IAtomImport,
  userId: string,
  values: Array<string>,
): Promise<TypeRef> => {
  const UnionType = await UnionTypeOGM()

  const containsPrimitives: boolean = values.every((x) =>
    allPrimitives.includes(x),
  )

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

      // console.log(`Creating union ${unionName}`)

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

  const checkPrimitiveOfUnionType = (data: Array<string>) => {
    if (containsPrimitives) {
      return connectUnionType(data)
    } else {
      return null
    }
  }

  //
  await checkPrimitiveOfUnionType(values)

  const isInterfaceTypeRegex = /^\{.+.}$/

  const getKeyObjInUnion = (data: string, choose: string) => {
    let key: any
    let value: any

    if (isInterfaceTypeRegex.test(data)) {
      const dataSlice = data.slice(1, data.length - 1)

      // console.log({ dataSlice })

      if (dataSlice.includes(',')) {
        const valuesSplit = dataSlice.split(',').forEach((s: string) => {
          const interfaceValues = s.trim()

          if (interfaceValues.includes(':')) {
            key = interfaceValues.split(':')[0]
            value = interfaceValues.split(':')[1]
          }
        })
      } else {
        const valuesSplit = dataSlice.split(':')

        key = valuesSplit[0]
        value = valuesSplit[1]
      }
    }

    if (choose === 'name') {
      return key
    } else {
      return value
    }
  }

  if (apiField.type.includes('{') && !findUnionType.test(apiField.type)) {
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

    if (!existingUnion) {
      const unionName = `${atom.name} ${pascalCaseToWords(
        apiField.property,
      )} Union API`

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
                connect: values.filter(checkType).map((value: string) => ({
                  where: {
                    node: {
                      name: checkPrimitiveType(value),
                    },
                  },
                })),
              },
              InterfaceType: {
                create: values
                  .filter(checkInterfaceType)
                  .map((value: string) => ({
                    node: {
                      id: v4(),
                      name: `${atom.name} ${getKeyObjInUnion(
                        value,
                        'name',
                      )} API`,
                      kind: ITypeKind.InterfaceType,
                      owner: connectTypeId(userId),
                      fields: {
                        connect: values
                          .filter(checkInterfaceType)
                          .map((item: string) => ({
                            edge: {
                              id: v4(),
                              key: `${getKeyObjInUnion(item, 'name')}`,
                              name: getKeyObjInUnion(item, 'name'),
                            },
                            where: {
                              node: {
                                // kind: checkTypeKind(item),
                                name: checkPrimitiveType(
                                  getKeyObjInUnion(item, 'none'),
                                ),
                              },
                            },
                          })),
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
  } else {
    return null
  }
}
