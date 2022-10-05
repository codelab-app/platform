import { getBaseTypes } from '@codelab/backend/infra/adapter/neo4j'
import {
  GetBaseTypesReturn,
  QueryBaseTypesArgs,
} from '@codelab/shared/abstract/codegen'
import { int, Transaction } from 'neo4j-driver'

export const typeRepository = {
  baseTypes: async (
    txn: Transaction,
    params: QueryBaseTypesArgs,
  ): Promise<GetBaseTypesReturn> => {
    const { options } = params
    const limit = options?.limit ?? 10
    const offset = options?.offset ?? 0

    const { records: getTypesRecords } = await txn.run(getBaseTypes, {
      limit: int(limit),
      skip: int(offset),
    })

    const totalCountRecord = getTypesRecords[0]?.get('totalCount')
    const totalCount = totalCountRecord ? int(totalCountRecord).toNumber() : 0

    const items = getTypesRecords.map((record) => {
      const type = record.get('type').properties
      const owner = record.get('owner').properties

      return {
        ...type,
        owner,
        __typename: 'BaseType',
      }
    })

    return {
      items,
      totalCount,
    }
  },
}
