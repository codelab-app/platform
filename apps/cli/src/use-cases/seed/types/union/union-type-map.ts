import { Repository } from '@codelab/backend/infra/adapter/neo4j'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { connectTypeId } from '@codelab/shared/data'
import { capitalizeFirstLetter, pascalCaseToWords } from '@codelab/shared/utils'
import { v4 } from 'uuid'
import { isInterfaceTypeRegex } from '../../utils/matchers'
import { extractObjectFromString } from '../../utils/parser'
import {
  containsInterfaceType,
  FieldTypeRef,
  isPrimitivePredicate,
} from '../../utils/type-predicates'
import { mapPrimitiveType } from '../primitive/map-primitive'
import { connectUnionType } from './connect-union'

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

export const getUnionTypeForApi: FieldTypeRef = async ({
  field,
  atom,
  userId,
  values,
}) => {
  const UnionType = await Repository.instance.UnionType

  /**
   * If we have a nested interface type
   */
  if (containsInterfaceType(field)) {
    // values
    //   .filter((item) => item.match(isInterfaceTypeRegex))
    //   .map((item) => {
    //     extractObjectFromString(item, 'name')
    //   })

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
                  .filter((type) => isPrimitivePredicate({ type }))
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
                  .map((value: string) => ({
                    node: {
                      id: v4(),
                      name: `${atom.name} ${pascalCaseToWords(
                        field.property,
                      )} ${capitalizeFirstLetter(
                        // TODO: Need to add case for multiple keys
                        Object.keys(extractObjectFromString(value))[0],
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
                              key: Object.keys(
                                extractObjectFromString(item),
                              )[0],
                              name: capitalizeFirstLetter(
                                Object.keys(extractObjectFromString(value))[0],
                              ),
                            },
                            where: {
                              node: {
                                // kind: checkTypeKind(item),
                                name: mapPrimitiveType(
                                  Object.values(
                                    extractObjectFromString(item),
                                  )[0],
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
  }

  if (isPrimitivePredicate(field)) {
    return connectUnionType({ field: field, atom, userId, values })
  }

  console.log(`Could not transform fields for Atom [${atom.type}]`, field)

  return null
}
