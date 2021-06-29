import { DgraphProvider, DgraphTokens, DgraphUseCase } from '@codelab/backend'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
import { Type, TypeMapper } from '../../../models'
import { GetTypeQueryBuilder, GetTypeQueryResult } from './get-type.query'
import { GetTypeRequest } from './get-type.request'

@Injectable()
/**
 * The GetTypeService doesn't make a recursive query, just a shallow one.
 * It's okay if it's used to get a shallow type, but if the queries become larger and more nested
 * they will go through more and more resolvers, so if that happens it's a good idea to make this a recursive query and just return everything
 */
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
    const query = new GetTypeQueryBuilder().withUidFunc(typeId).build()
    const response = await txn.query(query)

    const queryArray = (response.getJson() as any)
      ?.query as Array<GetTypeQueryResult>

    if (!queryArray || !queryArray[0]) {
      return null
    }

    const dqlType = queryArray[0]

    return this.typeMapper.map(dqlType)
  }
}
