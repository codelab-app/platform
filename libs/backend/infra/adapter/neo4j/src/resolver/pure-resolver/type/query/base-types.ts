import type { QueryBaseTypesArgs } from '@codelab/shared/abstract/codegen'
import type { IFieldResolver } from '@graphql-tools/utils'
import type { GraphQLRequestContext } from 'graphql-request/dist/types'
import { int } from 'neo4j-driver'
import { getBaseTypes } from '../../../../cypher'
import { withReadTransaction } from '../../../../infra'

export const baseTypes: IFieldResolver<
  GraphQLRequestContext,
  unknown,
  QueryBaseTypesArgs
> = (_, params) =>
  withReadTransaction(async (txn) => {
    const { options } = params

    const { records: getTypesRecords } = await txn.run(getBaseTypes, {
      limit: options?.limit ? int(options.limit) : null,
      name: options?.where?.name ?? '',
      skip: options?.offset ? int(options.offset) : null,
    })

    const totalCountRecord = getTypesRecords[0]?.get('totalCount')
    const totalCount = totalCountRecord ? int(totalCountRecord).toNumber() : 0

    const items = getTypesRecords.map((record) => {
      const type = record.get('type').properties
      const owner = record.get('owner').properties

      return {
        ...type,
        __typename: 'BaseType',
        owner,
      }
    })

    return {
      items,
      totalCount,
    }
  })
