import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { logger } from '@codelab/shared/adapter/logging'
import { connectTypeId } from '@codelab/shared/data'
import { capitalizeFirstLetter, pascalCaseToWords } from '@codelab/shared/utils'
import { v4 } from 'uuid'
import { isInterfaceTypeRegex } from '../../utils/matchers'
import { extractObjectFromString } from '../../utils/parser'
import {
  FieldTypeRef,
  isPrimitivePredicate,
  unionContainsInterfaceType,
} from '../../utils/type-predicates'
import { mapPrimitiveType } from '../primitive/map-primitive'

/**
 *
 * Take a type of `boolean | { inkBar: boolean, tabPane: boolean }`, interfaceString is `{ inkBar: boolean, tabPane: boolean }`
 *
 * @param interfaceString E.G. { key: boolean, key2: string }
 * @param choose
 */
// const convertObjectStringToObject = (interfaceString: string) => {
//   console.log('Interface Data', interfaceString)
//   // Initialize "key" variable to get the property, the "value" variable to get type of property
//
//   // if string is undefined
//   if (!interfaceString || interfaceString.includes(',')) {
//     console.log(`Can't get values from interface value ${interfaceString}`)
//
//     return {}
//   }
//
//   const hasColon = /:/
//   const dataSlice = interfaceString.slice(1, interfaceString.length - 1)
//   const temp = dataSlice.split(hasColon)
//   const theObj: Record<string, unknown> = {}
//
//   for (let i = 0; i < temp.length; i += 2) {
//     theObj[temp[i].trim()] = temp[i + 1]
//   }
//
//   return {
//     keys: Object.entries(theObj).toString(),
//     values: Object.values(theObj).toString(),
//   }
// }

/**
 *
 * @param field
 * @param atom
 * @param userId
 * @param values the is array of types for union (currently we filtered it to primitive types only)
 */
export const getUnionTypeForApi: FieldTypeRef = async ({
  field,
  atom,
  userId,
  values,
}) => {
  logger.info('Get Union Type', values)

  const UnionType = await Repository.instance.UnionType

  /**
   * If we have a nested interface type
   */
  if (unionContainsInterfaceType(values)) {
    const [existingUnion] = await UnionType.find({
      where: {
        AND: [
          {
            name: `${atom.name} ${pascalCaseToWords(field.property)} Union API`,
          },
        ],
      },
    })

    if (!existingUnion) {
      const unionName = `${atom.name} ${pascalCaseToWords(
        field.property,
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
                connect: values
                  .filter((type) => isPrimitivePredicate([type]))
                  .map((value: string) => ({
                    where: {
                      node: {
                        name: mapPrimitiveType(value),
                      },
                    },
                  })),
              },
              InterfaceType: {
                create: values
                  .filter((item: string) => item.match(isInterfaceTypeRegex))
                  .map((interfaceType: string) => {
                    // TODO: Need to add case for multiple keys
                    const interfaceTypeName = Object.keys(
                      extractObjectFromString(interfaceType),
                    )[0]

                    if (!interfaceTypeName) {
                      throw new Error('Invalid interface type name')
                    }

                    return {
                      node: {
                        id: v4(),
                        name: `${atom.name} ${pascalCaseToWords(
                          field.property,
                        )} ${capitalizeFirstLetter(interfaceTypeName)} API`,
                        kind: ITypeKind.InterfaceType,
                        owner: connectTypeId(userId),
                        fields: {
                          connect: values
                            .filter((type: string) =>
                              type.match(isInterfaceTypeRegex),
                            )
                            .map((item: string) => {
                              const typeId = v4()

                              const typeName = Object.keys(
                                extractObjectFromString(interfaceType),
                              )[0]

                              if (!typeName) {
                                throw new Error('missing type name')
                              }

                              const existingTypeName = mapPrimitiveType(
                                Object.values(extractObjectFromString(item))[0],
                              )

                              if (!existingTypeName) {
                                throw new Error('Field type not found')
                              }

                              return {
                                edge: {
                                  id: typeId,
                                  key: typeName,
                                  name: capitalizeFirstLetter(typeName),
                                },
                                where: {
                                  node: {
                                    // Connect to our primitive type by name
                                    name: existingTypeName,
                                  },
                                },
                              }
                            }),
                        },
                      },
                    }
                  }),
              },
            },
            owner: connectTypeId(userId),
          },
        ],
      })

      if (!unionType) {
        throw new Error('Union type creation failed')
      }

      return {
        existingId: unionType.id,
      }
    }

    return {
      existingId: existingUnion.id,
    }
  }

  // Not needed here, we connect union type above
  // if (isPrimitivePredicate(values)) {
  //   return connectUnionType({ field: field, atom, userId, values })
  // }

  console.log(`Could not transform fields for Atom [${atom.type}]`, field)

  return null
}
