import { UnionTypeOGM } from '@codelab/backend/adapter/neo4j'
import { IAtomExport, ITypeKind } from '@codelab/shared/abstract/core'
import { connectTypeId } from '@codelab/shared/data'
import { pascalCaseToWords } from '@codelab/shared/utils'
import { v4 } from 'uuid'
import { AntdDesignApi } from './../data/ant-design.data'
import { checkPrimitiveType } from './primitive-type-map'

const checkType = (value: string) => {
  return value === 'boolean' || value === 'number' || value === 'string'
}

const checkInterfaceType = (value: string) => {
  return value.includes('{')
}

type TypeRef = {
  existingId: string
} | null

export const getUnionTypeForApi = async (
  apiField: AntdDesignApi,
  atom: IAtomExport,
  userId: string,
  values: Array<string>,
): Promise<TypeRef> => {
  const UnionType = await UnionTypeOGM()

  const getKeyObjInUnion = (data: string, choose: string) => {
    let key: any
    let value: any

    if (data[0] == '{' && data[1] == ' ') {
      const lastIndex = data.split('').findIndex((va: string) => va == ':')
      const a = Array.from(data).findIndex((b: string) => b == '}')
      key = data.split('').slice(2, lastIndex).join('')
      value = data
        .split('')
        .slice(lastIndex + 2, a)
        .join('')
    }

    if (choose === 'name') {
      return key
    } else {
      return value
    }
  }

  //   const a = values
  //     .filter(checkInterfaceType)
  //     .map((value: string) => getKeyObjInUnion(value, 'union'))

  values
    .filter(checkInterfaceType)
    .map((value: string) =>
      console.log('aaaa', getKeyObjInUnion(value, 'union')),
    )

  values
    .filter(checkInterfaceType)
    .map((value: string) => console.log('bbb', value))

  // values.map((value: string) =>
  //   console.log('ccccc', getKeyObjInUnion(value, 'aaaa')),
  // )

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
                    name: `${atom.name} ${getKeyObjInUnion(value, 'name')} API`,
                    kind: ITypeKind.InterfaceType,
                    owner: connectTypeId(userId),
                    fields: {
                      create: values
                        .filter(checkInterfaceType)
                        .map((item: string) => ({
                          node: {
                            PrimitiveType: {
                              id: v4(),
                              name: `${getKeyObjInUnion(item, 'name')}`,
                              kind: ITypeKind.PrimitiveType,
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
