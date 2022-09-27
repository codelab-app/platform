import {
  ArrayTypeOGM,
  baseSelection,
  PrimitiveTypeOGM,
} from '@codelab/backend/adapter/neo4j'
import {
  QueryTypesArgs,
  TypeBase,
  TypeKind,
} from '@codelab/shared/abstract/codegen'
import { node, Query, relation } from 'cypher-query-builder'
import { Transaction } from 'neo4j-driver'

export const typeRepository = {
  getTypes: async (
    txn: Transaction,
    params: QueryTypesArgs,
  ): Promise<Array<TypeBase>> => {
    const { options } = params
    const { limit, offset } = options || {}
    let query = new Query()
    const arrayTypeOGM = await ArrayTypeOGM()
    const primativeTypeOGM = await PrimitiveTypeOGM()

    const typeQueries: any = {
      [TypeKind.PrimitiveType]: {
        ogm: primativeTypeOGM,
        selectionSet: `{${baseSelection} primitiveKind}`,
      },
      [TypeKind.ArrayType]: {
        ogm: arrayTypeOGM,
        selectionSet: `
        {
                    ${baseSelection}
            itemType {
            ... on TypeBase {
                id
                name
                __typename
              }
            }
        }
        `,
      },
    }

    query = query
      .match([
        node('type', 'Type'),
        relation('either', 'ownedBy', 'OWNED_BY'),
        node('owner', 'User'),
      ])
      .return(['type'])

    const { query: cypherQuery, params: cypherParams } =
      query.buildQueryObject()

    const { records } = await txn.run(cypherQuery, cypherParams)
    const baseTypes = records.map((r) => r.get(0).properties)

    const resolvedTypeRequests = baseTypes.map((type) => {
      const kind = type.kind
      const typeQuery = typeQueries[kind]
      // console.log({
      //   typeQuery,
      //   kind,
      //   type,
      // })

      if (!typeQuery) {
        return Promise.resolve(type)
      }

      const { ogm, selectionSet } = typeQuery

      return ogm.find({ where: { id: type.id }, selectionSet: selectionSet })
    })

    const resolvedType = await Promise.all(resolvedTypeRequests)
    console.log(JSON.stringify(resolvedType, null, 2))

    const t = resolvedType.map((t) => t[0])
    // console.log({ t })

    return t
  },
}
