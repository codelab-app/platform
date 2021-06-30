import {
  DgraphArrayMapper,
  DgraphProvider,
  DgraphTokens,
  DgraphUseCase,
} from '@codelab/backend'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
import {
  DgraphType,
  Type,
  TypeMapper,
  TypeMapperContext,
} from '../../../models'
import {
  GetDgraphTypeQueryBuilder,
  GetDgraphTypeQueryResult,
} from '../get-dgraph-type'
import { GetTypesInput } from './get-types.input'

@Injectable()
export class GetTypesService extends DgraphUseCase<GetTypesInput, Array<Type>> {
  private typeArrayMapper: DgraphArrayMapper<
    DgraphType,
    Type,
    TypeMapperContext
  >

  constructor(
    @Inject(DgraphTokens.DgraphProvider)
    protected readonly dgraphProvider: DgraphProvider,
    typeMapper: TypeMapper,
  ) {
    super(dgraphProvider)
    this.typeArrayMapper = new DgraphArrayMapper(typeMapper)
  }

  protected async executeTransaction(
    request: GetTypesInput,
    txn: Txn,
  ): Promise<Array<Type>> {
    const qb = new GetDgraphTypeQueryBuilder()

    if (request.byIds) {
      qb.withUidsFunc(request.byIds.typeIds)
    } else {
      qb.withTypeFunc('Type')
    }

    const query = qb.build()
    const response = await txn.query(query)
    const result = response.getJson().query as Array<GetDgraphTypeQueryResult>

    return this.typeArrayMapper.map(result as any)
  }
}
