import type { DgraphProvider } from '@codelab/backend'
import {
  BaseDgraphFields,
  DgraphTokens,
  DgraphUseCase,
  UidFilter,
} from '@codelab/backend'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { DgraphField, FieldDgraphFields, FieldMapper } from '../../../models'
import { GetFieldQueryBuilder, GetFieldQueryResult } from './get-field.query'
import { GetFieldRequest } from './get-field.request'
import {
  GetInterfaceFieldByKeyQueryBuilder,
  GetInterfaceFieldByKeyResult,
} from './get-interface-field-by-key.query'

@Injectable()
//Using a dgraph query, because we already have the infrastructure to
//deserialize dgraph models, might as well use it instead of replicating it with a graphql response
export class GetDgraphFieldService extends DgraphUseCase<
  GetFieldRequest,
  DgraphField | null
> {
  constructor(
    @Inject(DgraphTokens.DgraphProvider)
    dgraphProvider: DgraphProvider,
    private fieldMapper: FieldMapper,
  ) {
    super(dgraphProvider)
  }

  protected async executeTransaction(
    { input: { byInterface, byId } }: GetFieldRequest,
    txn: Txn,
  ): Promise<DgraphField | null> {
    if (byInterface) {
      const query = new GetInterfaceFieldByKeyQueryBuilder(
        byInterface.fieldKey,
        byId ? [new UidFilter(byId.fieldId)] : [],
      )
        .withUidFunc(byInterface.interfaceId)
        .build()

      const response = ((await txn.query(query)).data as any)
        .query[0] as GetInterfaceFieldByKeyResult

      if (!response || !response[BaseDgraphFields.DgraphType]) {
        return null
      }

      const fields = response['Interface.fields']

      if (
        !fields ||
        !fields.length ||
        !fields[0] ||
        !fields[0][BaseDgraphFields.DgraphType]
      ) {
        return null
      }

      return DgraphField.Schema.parse(fields[0])
    } else if (byId) {
      const query = new GetFieldQueryBuilder().withUidFunc(byId.fieldId).build()

      const response = ((await txn.query(query)).data as any)
        .query[0] as GetFieldQueryResult

      if (!response || !response[BaseDgraphFields.DgraphType]) {
        return null
      }

      return DgraphField.Schema.parse({
        ...response,
        [FieldDgraphFields.Decorators]: [], //need to add those when adding decorator support
      })
    } else {
      throw new Error('Either byInterface or byId must be provided')
    }
  }
}
