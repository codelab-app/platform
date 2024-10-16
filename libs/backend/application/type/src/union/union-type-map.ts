import type { OGM } from '@neo4j/graphql-ogm'

import { ITypeKind } from '@codelab/shared/abstract/core'
import { connectNodeId } from '@codelab/shared/domain-old'
import { logger } from '@codelab/shared/infra/logging'
import { capitalizeFirstLetter, titleCase } from '@codelab/shared/utils'
import { v4 } from 'uuid'

import { AntDesignTypeMapper } from '../mapper'
import {
  extractObjectFromString,
  type FieldTypeRef,
  isInterfaceType,
  isPrimitiveType,
  parseSeparators,
  unionContainsInterfaceType,
} from '../parser'

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
export const upsertUnionFieldType =
  (ogm: OGM): FieldTypeRef =>
  async ({ atom, field, userId }) => {
    logger.info('Get Union Type', field.type)

    const UnionType = await ogm.model('UnionType')
    const values = parseSeparators(field)

    /**
     * If we have a nested interface type
     */
    if (unionContainsInterfaceType(field.type)) {
      const [existingUnion] = await UnionType.find({
        where: {
          AND: [
            {
              name: `${atom.name} ${titleCase(field.property)} Union API`,
            },
          ],
        },
      })

      if (!existingUnion) {
        const unionName = `${atom.name} ${titleCase(field.property)} Union API`

        const {
          unionTypes: [unionType],
        } = await UnionType.create({
          input: [
            {
              id: v4(),
              kind: ITypeKind.UnionType,
              name: unionName,
              owner: connectNodeId(userId),
              typesOfUnionType: {
                InterfaceType: {
                  create: values
                    .filter(isInterfaceType)
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
                          fields: {
                            connect: values
                              .filter(isInterfaceType)
                              .map((item: string) => {
                                const typeId = v4()

                                const typeName = Object.keys(
                                  extractObjectFromString(interfaceType),
                                )[0]

                                if (!typeName) {
                                  throw new Error('missing type name')
                                }

                                const existingTypeName =
                                  AntDesignTypeMapper.mapPrimitiveType(
                                    Object.values(
                                      extractObjectFromString(item),
                                    )[0],
                                  )

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
                          id: v4(),
                          kind: ITypeKind.InterfaceType,
                          name: `${atom.name} ${titleCase(
                            field.property,
                          )} ${capitalizeFirstLetter(interfaceTypeName)} API`,
                          owner: connectNodeId(userId),
                        },
                      }
                    }),
                },
                PrimitiveType: {
                  connect: values
                    .filter((type) => isPrimitiveType(type))
                    .map((value: string) => ({
                      where: {
                        node: {
                          name: AntDesignTypeMapper.mapPrimitiveType(value),
                        },
                      },
                    })),
                },
              },
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
