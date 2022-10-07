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
  FieldTypeRef,
  findUnionType,
  isHasAngleBracket,
  isInterfaceTypeRegex,
  isPrimitivePredicate,
} from '../../utils/type-predicates'
import { allPrimitives, mapPrimitiveType } from '../primitive/map-primitive'
import { connectUnionType } from './connect-union'

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
    const theObj: Record<string, unknown> = {}

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

export const getUnionTypeForApi: FieldTypeRef = async ({
  field,
  atom,
  userId,
  values,
}) => {
  const UnionType = await Repository.instance.UnionType

  if (isHasAngleBracket.test(field.type) && !findUnionType.test(field.type)) {
    values
      .filter((item: string) => item.match(isInterfaceTypeRegex))
      .map((item: string) => {
        getDataOfInterface(item, 'name')
      })

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
                                name: mapPrimitiveType(
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
  }

  if (isPrimitivePredicate(field)) {
    return connectUnionType({ field: field, atom, userId, values })
  }

  console.log(`Could not transform fields for Atom [${atom.type}]`, field)

  return null
}
