import type { DgraphProvider } from '@codelab/backend'
import { DgraphTokens, DgraphUseCase } from '@codelab/backend'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { Type, TypeMapper } from '../../../models'
import { GetTypeQueryBuilder, GetTypeQueryResult } from './get-type.query'
import { GetTypeRequest } from './get-type.request'

@Injectable()
export class GetTypeService extends DgraphUseCase<GetTypeRequest, Type | null> {
  constructor(
    @Inject(DgraphTokens.DgraphProvider)
    dgraphProvider: DgraphProvider,
    private typeMapper: TypeMapper,
  ) {
    super(dgraphProvider)
  }

  protected async executeTransaction(
    { input: { typeId } }: GetTypeRequest,
    txn: Txn,
  ): Promise<Type | null> {
    const query = new GetTypeQueryBuilder().withUid(typeId).build()
    const response = await txn.query(query)

    const queryArray = (response.data as any)
      ?.query as Array<GetTypeQueryResult>

    if (!queryArray || !queryArray[0]) {
      return null
    }

    const dqlType = queryArray[0]

    return this.typeMapper.map(dqlType)
  }
}
