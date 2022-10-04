import {
  AntdDesignField,
  IAtomImport,
  TypeRef,
} from '@codelab/backend/abstract/core'
import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { connectTypeId } from '@codelab/shared/data'
import { capitalizeFirstLetter, pascalCaseToWords } from '@codelab/shared/utils'
import { v4 } from 'uuid'
import {
  findUnionType,
  isHasAngleBracket,
  isInterfaceTypeRegex,
} from '../utils/isRenderPropType'

const checkType = (value: string) => {
  return value === 'boolean' || value === 'number' || value === 'string'
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

export const getUnionTypeForApi = async (
  apiField: AntdDesignField,
  atom: IAtomImport,
  userId: string,
  values: Array<string>,
): Promise<TypeRef> => {
  const UnionType = await Repository.instance.UnionType

  const containsPrimitives: boolean = values.every((x) =>
    allPrimitives.includes(x),
  )

  const getDataOfInterface = (interfaceData: string, choose: string) => {
    // Initialize "key" variable to get the property, the "value" variable to get type of property

    // if string is undefined
    if (!interfaceData) {
      console.log(`Can't get values from interface value ${interfaceData}`)

      return ''
    }

    // if string have not comma
    if (interfaceData.includes(',')) {
      console.log(`Can't get values from interface value ${interfaceData}`)

      return ''
    } else {
      const hasColon = /[:]/
      const dataSlice = interfaceData.slice(1, interfaceData.length - 1)
      const temp = dataSlice.split(hasColon)
      const theObj = {} as any

      for (let i = 0; i < temp.length; i += 2) {
        theObj[temp[i].trim()] = temp[i + 1]
      }

      if (choose === 'key') {
        return Object.keys(theObj).toString()
      } else {
        return Object.values(theObj).toString()
      }
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

  if (
    isHasAngleBracket.test(apiField.type) &&
    !findUnionType.test(apiField.type)
  ) {
    values
      .filter((item: string) => item.match(isInterfaceTypeRegex))
      .map((item: string) => {
        getDataOfInterface(item, 'name')
      })

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
                  .filter((item: string) => item.match(isInterfaceTypeRegex))
                  .map((value: string) => ({
                    node: {
                      id: v4(),
                      name: `${atom.name} ${pascalCaseToWords(
                        apiField.property,
                      )} ${capitalizeFirstLetter(
                        getDataOfInterface(value, 'key'),
                      )} API`,
                      kind: ITypeKind.InterfaceType,
                      owner: connectTypeId(userId),
                      fields: {
                        connect: values
                          .filter((item: string) =>
                            item.match(isInterfaceTypeRegex),
                          )
                          .map((item: string) => ({
                            edge: {
                              id: v4(),
                              key: `${getDataOfInterface(item, 'key')}`,
                              name: `${capitalizeFirstLetter(
                                getDataOfInterface(value, 'key'),
                              )}`,
                            },
                            where: {
                              node: {
                                // kind: checkTypeKind(item),
                                name: checkPrimitiveType(
                                  getDataOfInterface(item, 'none'),
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
  } else if (containsPrimitives) {
    return connectUnionType(values)
  } else {
    console.log(`Could not transform fields for Atom [${atom.type}]`, apiField)

    return null
  }
}
