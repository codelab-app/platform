import {
  getBaseTypes,
  getTypeIndex,
} from '@codelab/backend/infra/adapter/neo4j'
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
    let offset = options?.offset ?? 0

    const where = options?.where ?? {
      name: '',
    }

    if (where.id) {
      const result = await txn.run(getTypeIndex, { typeId: where.id })
      const index = int(result.records[0]?.get('index')).toNumber()
      offset = Math.floor(index / limit) * limit

      const record = result.records[0]
      const selectedType = record?.get('selectedType').properties

      if (!selectedType) {
        return {
          items: [],
          totalCount: 0,
        }
      }

      const owner = record.get('owner').properties

      return {
        items: [
          {
            ...selectedType,
            owner,
            __typename: 'BaseType',
          },
        ],
        totalCount: 1,
        offset,
      }
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
      offset,
    }
  },
}
