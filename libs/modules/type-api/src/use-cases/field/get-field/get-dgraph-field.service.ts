import type { DgraphProvider } from '@codelab/backend'
import {
  BaseDgraphFields,
  DgraphTokens,
  DgraphUseCase,
  UidFilter,
} from '@codelab/backend'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
import {
  DgraphField,
  dgraphFieldSchema,
  DgraphInterface,
  InterfaceDgraphFields,
} from '../../../models'
import { GetFieldQueryBuilder } from './get-field.query'
import { GetFieldRequest } from './get-field.request'

@Injectable()
// Using a dgraph query, because we already have the infrastructure to
// deserialize dgraph models, might as well use it instead of replicating it with a graphql response
export class GetDgraphFieldService extends DgraphUseCase<
  GetFieldRequest,
  DgraphField | null
> {
  constructor(
    @Inject(DgraphTokens.DgraphProvider)
    dgraphProvider: DgraphProvider,
  ) {
    super(dgraphProvider)
  }

  protected async executeTransaction(
    { input: { byInterface, byId } }: GetFieldRequest,
    txn: Txn,
  ): Promise<DgraphField | null> {
    if (byInterface) {
      const query = new GetFieldQueryBuilder(
        byInterface.fieldKey,
        byId ? [new UidFilter(byId.fieldId)] : [],
      )
        .withUidFunc(byInterface.interfaceId)
        .build()

      const response = ((await txn.query(query)).getJson() as any)
        .query[0] as DgraphInterface

      if (!response || !response[BaseDgraphFields.DgraphType]) {
        return null
      }

      const fields = response[InterfaceDgraphFields.Fields]

      if (
        !fields ||
        !fields.length ||
        !fields[0] ||
        !fields[0][BaseDgraphFields.DgraphType]
      ) {
        return null
      }

      dgraphFieldSchema.parse(fields[0])

      return fields[0]
    } else if (byId) {
      const query = new GetFieldQueryBuilder().withUidFunc(byId.fieldId).build()

      const data = ((await txn.query(query)).getJson() as any)
        .query[0] as DgraphField

      if (!data || !data[BaseDgraphFields.DgraphType]) {
        return null
      }

      dgraphFieldSchema.parse(data)

      return data
    } else {
      throw new Error('Either byInterface or byId must be provided')
    }
  }
}
