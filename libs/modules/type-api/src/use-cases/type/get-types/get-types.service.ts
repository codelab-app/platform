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
    if (request.byIds) {
      const query = new GetDgraphTypeQueryBuilder()
        .withUidsFunc(request.byIds.typeIds)
        .build()

      const response = await txn.query(query)
      const result = response.getJson().query as Array<GetDgraphTypeQueryResult>

      return this.typeArrayMapper.map(result as any)
    }

    throw new Error('Bad request')
  }

  protected async validate(request: GetTypesInput): Promise<void> {
    if (!request.byIds) {
      throw new Error('Provide exactly one GetTypes filter')
    }
  }
}
