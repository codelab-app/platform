import { getBaseTypes } from '@codelab/backend/infra/adapter/neo4j'
import {
  BaseType,
  GetBaseTypesReturn,
  QueryBaseTypesArgs,
} from '@codelab/shared/abstract/codegen'
import { int, Record, Transaction } from 'neo4j-driver'
import { GetBaseTypesRecord } from './types'

export const typeRepository = {
  baseTypes: async (
    txn: Transaction,
    params: QueryBaseTypesArgs,
  ): Promise<GetBaseTypesReturn> => {
    const { options } = params
    const { limit = 10, offset = 0 } = options || {}

    const { records: getTypesRecords } = await txn.run(getBaseTypes, {
      limit: int(Number(limit)),
      skip: int(Number(offset)),
    })

    const totalCountRecord = getTypesRecords[0]?.get('totalCount')
    const totalCount = totalCountRecord ? int(totalCountRecord).toNumber() : 0

    const withOwner = (
      data: BaseType,
      record: Record<GetBaseTypesRecord>,
    ): BaseType => {
      const owner = record.get('owner').properties

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

    const items = getTypesRecords.map((record) => {
      return withOwner(
        dataMapper(record as Record<GetBaseTypesRecord>),
        record as Record<GetBaseTypesRecord>,
      )
    })

    return {
      items,
      totalCount,
    }
  },
}
