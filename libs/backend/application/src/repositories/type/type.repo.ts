import {
  countBaseTypes,
  getBaseTypes,
} from '@codelab/backend/infra/adapter/neo4j'
import { int, Record, Transaction } from 'neo4j-driver'
import { GetBaseTypesRecord } from './types'

type BaseType = any

export const typeRepository = {
  countBaseTypes: async (txn: Transaction, offset = 0): Promise<number> => {
    const { records: countTypesRecords } = await txn.run(countBaseTypes, {
      skip: int(Number(offset)),
    })

    const totalCountNeo4j = countTypesRecords[0].get('count(type)')
    const totalCount = int(totalCountNeo4j).toNumber()

    return totalCount
  },

  baseTypes: async (
    txn: Transaction,
    params: any,
  ): Promise<Array<BaseType>> => {
    const { options } = params
    const { limit = 10, offset = 0 } = options || {}

    const { records: getTypesRecords } = await txn.run(getBaseTypes, {
      limit: int(Number(limit)),
      skip: int(Number(offset)),
    })

    const withOwner = (
      data: BaseType,
      record: Record<GetBaseTypesRecord>,
    ): BaseType => {
      const owner = record.get('owner')?.properties

      if (!owner) {
        throw new Error('owner not found')
      }

      return {
        ...data,
        owner,
      }
    }

    const dataMapper = (record: Record<GetBaseTypesRecord>): BaseType => {
      const type = record.get('type').properties

      return {
        ...type,
        __typename: 'BaseType',
      }
    }

    const items = getTypesRecords.flatMap((record) => {
      return withOwner(
        dataMapper(record as Record<GetBaseTypesRecord>),
        record as Record<GetBaseTypesRecord>,
      )
    })

    return items
  },
}
