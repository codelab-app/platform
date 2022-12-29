import {
  getBaseTypeOffset,
  getBaseTypes,
} from '@codelab/backend/infra/adapter/neo4j'
import type {
  GetBaseTypeOffsetReturn,
  GetBaseTypesReturn,
  QueryBaseTypeOffsetArgs,
  QueryBaseTypesArgs,
} from '@codelab/shared/abstract/codegen'
import type { Transaction } from 'neo4j-driver'
import { int } from 'neo4j-driver'

export const typeRepository = {
  baseTypes: async (
    txn: Transaction,
    params: QueryBaseTypesArgs,
  ): Promise<GetBaseTypesReturn> => {
    const { options } = params
    const limit = options?.limit ?? 10
    const offset = options?.offset ?? 0

    const where = options?.where?.name
      ? options.where
      : {
          name: '',
        }

    const { records: getTypesRecords } = await txn.run(getBaseTypes, {
      limit: int(limit),
      skip: int(offset),
      name: where.name,
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
  baseTypeOffset: async (
    txn: Transaction,
    params: QueryBaseTypeOffsetArgs,
  ): Promise<GetBaseTypeOffsetReturn> => {
    const { where } = params

    const { records } = await txn.run(getBaseTypeOffset, {
      id: where?.id,
      name_CONTAINS: where?.name_CONTAINS ?? '',
    })

    return {
      offset: records[0]?.get('offset'),
    }
  },
}
