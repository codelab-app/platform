import {} from '@codelab/backend/adapter/neo4j'
import { QueryTypesArgs, TypeBase } from '@codelab/shared/abstract/codegen'
import { node, Query } from 'cypher-query-builder'
import { Transaction } from 'neo4j-driver'

export const typeRepository = {
  getTypes: async (
    txn: Transaction,
    params: QueryTypesArgs,
  ): Promise<Array<TypeBase>> => {
    const { options } = params
    const { limit, offset } = options || {}
    let query = new Query()

    query = query.match([node('type', 'Type')]).return(['type'])

    if (offset) {
      query.skip(offset)
    }

    query.limit(limit || 50)

    const { query: cypherQuery, params: cypherParams } =
      query.buildQueryObject()

    const { records } = await txn.run(cypherQuery, cypherParams)
    const results = records.map((r) => r.get(0).properties)

    return results
  },
}
