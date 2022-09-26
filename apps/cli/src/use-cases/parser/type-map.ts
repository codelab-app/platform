import {
  EnumTypeOGM,
  PrimitiveTypeOGM,
  ReactNodeTypeOGM,
  RenderPropsTypeOGM,
  UnionTypeOGM,
} from '@codelab/backend/adapter/neo4j'
import {
  IAtomExport,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { connectTypeId } from '@codelab/shared/data'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { v4 } from 'uuid'
import { logTask } from '../../shared/utils/log-task'
import { AntdDesignApi } from './data/ant-design.data'
import {
  findUnionType,
  isReactNodeTypeRegex,
  isRenderPropType,
} from './utils/isRenderPropType'

// import { PrimitiveTypeKind } from

type TypeRef = {
  existingId: string
} | null

/**
 * Return existing type ref, or return create data for enums
 *
 *
 */
const checkPrimitiveType = (value: string) => {
  switch (value) {
    case 'boolean':
      return IPrimitiveTypeKind.Boolean
    case 'string':
      return IPrimitiveTypeKind.String
    default:
      return IPrimitiveTypeKind.Float
  }
}

const checkType = (value: string) => {
  return value === 'boolean' || value === 'number' || value === 'string'
}

const checkInterfaceType = (value: string) => {
  return value.includes('{')
}

// const handleCreateInterface = async (value: any) => {
//   for await (const { atom, fields } of value) {
//     for await (const field of fields) {
//       if (!atom?.api?.id) {
//         continue
//       }

//       await fieldRepository.upsertField({
//         interfaceTypeId: atom?.api?.id,
//         fieldTypeId: field.fieldType,
//         field: {
//           id: field.id,
//           name: field.name,
//           key: field.key,
//           description: field.description,
//         },
//       })

//     }
//   }
// }

export const getTypeForApi = async (
  apiField: AntdDesignApi,
  atom: IAtomExport,
  userId: string,
): Promise<TypeRef> => {
  logTask('Get Type For API', atom.name, apiField)

  const type = apiField.type.trim()
  const PrimitiveType = await PrimitiveTypeOGM()
  const ReactNodeType = await ReactNodeTypeOGM()
  const RenderPropsType = await RenderPropsTypeOGM()
  const EnumType = await EnumTypeOGM()
  const UnionType = await UnionTypeOGM()
  const values = apiField.type.split('|').map((value: string) => value.trim())
  const isBaseCondition = apiField.type.indexOf('|') > -1
  const isComplexUnion = isBaseCondition && apiField.type.indexOf('{') > -1

  const getKeyObjInUnion = (data: string, choose: string) => {
    let key: any
    let value: any

    if (data[0] == '{' && data[1] == ' ') {
      const lastIndex = data.split('').findIndex((va: string) => va == ':')
      key = data.split('').slice(2, lastIndex).join('')
      value = data
        .split('')
        .slice(lastIndex + 2, data.length - 2)
        .join('')
    }

    if (choose === 'name') {
      return key
    } else {
      return value
    }
  }

  // Async function to connect Union Type
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

    if (!existingUnion) {
      const unionName = `${atom.name} ${pascalCaseToWords(
        apiField.property,
      )} Union API`

      // console.log(`Creating union ${unionName}`)

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

  // Check and Create Enum Type
  if (apiField.isEnum) {
    /**
     * Check if enum has been created already
     */
    const [existingEnum] = await EnumType.find({
      where: {
        AND: [
          {
            name: `${atom.name} ${pascalCaseToWords(
              apiField.property,
            )} Enum API`,
          },
        ],
      },
    })

    if (!existingEnum) {
      const enumName = `${atom.name} ${pascalCaseToWords(
        apiField.property,
      )} Enum API`

      // console.log(`Creating enum ${enumName}`)

      const {
        enumTypes: [enumType],
      } = await EnumType.create({
        input: [
          {
            id: v4(),
            name: enumName,
            kind: ITypeKind.EnumType,
            allowedValues: {
              create: values.map((value: string) => ({
                node: {
                  id: v4(),
                  value,
                  name: pascalCaseToWords(value),
                },
              })),
            },
            owner: connectTypeId(userId),
          },
        ],
      })

      return {
        existingId: enumType.id,
      }
    }

    return {
      existingId: existingEnum.id,
    }
  }

  // Check and Create React Node Type
  if (isReactNodeTypeRegex.test(type)) {
    const [renderNodeType] = await ReactNodeType.find({
      where: {
        name: ITypeKind.ReactNodeType,
      },
    })

    return {
      existingId: renderNodeType.id,
    }
  }

  if (isRenderPropType(type)) {
    const [renderPropsType] = await RenderPropsType.find({
      where: {
        name: ITypeKind.RenderPropsType,
      },
    })

    return {
      existingId: renderPropsType.id,
    }
  }

  const a = values
    .filter(checkInterfaceType)
    .map((value: string) => getKeyObjInUnion(value, 'union'))

  // Check and Create Complex Union Type
  if (isComplexUnion && !findUnionType.test(type) && a.includes('number')) {
    values
      .filter(checkInterfaceType)
      .map((value: string) =>
        console.log('aaaa', getKeyObjInUnion(value, 'union')),
      )

    values
      .filter(checkInterfaceType)
      .map((value: string) => console.log('bbb', value))

    values.map((value: string) =>
      console.log('ccccc', getKeyObjInUnion(value, 'aaaa')),
    )

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
                create: values.map((value: string) => ({
                  node: {
                    id: v4(),
                    name: `${atom.name} ${getKeyObjInUnion(value, 'name')} API`,
                    kind: ITypeKind.InterfaceType,
                    owner: connectTypeId(userId),
                    fields: {
                      create: values.map((item: string) => ({
                        node: {
                          PrimitiveType: {
                            id: v4(),
                            name: `${getKeyObjInUnion(item, 'none')}`,
                            // kind: ITypeKind.PrimitiveType,
                            primitiveKind: checkPrimitiveType(
                              getKeyObjInUnion(item, 'none'),
                            ),
                          },
                        },
                        edge: {
                          id: v4(),
                          key: `${getKeyObjInUnion(item, 'name')}`,
                          name: `${pascalCaseToWords(value)}`,
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
  }

  // Check and Create Simple Union Type or Primitive Type
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

    case 'number | string': {
      return connectUnionType(values)
    }

    case 'string | boolean': {
      return connectUnionType(values)
    }

    case 'boolean | number': {
      return connectUnionType(values)
    }

    case 'string | number': {
      return connectUnionType(values)
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
      if (!(isComplexUnion || isReactNodeTypeRegex.test(type))) {
        // console.log(
        //   `Could not transform fields for Atom [${atom.type}]`,
        //   apiField,
        // )
      }

      return null
    }
  }
}
