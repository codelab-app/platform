import { DgraphProvider, DgraphTokens, DgraphUseCase } from '@codelab/backend'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
// shortened import causes circular reference and some weird shit happen
import { ElementGuardService } from '../../auth/element-guard/element-guard.service'
import { FlattenElementTreeService } from '../flatten-element-tree'
import {
  GetElementAggregateQuery,
  GetElementQueryType,
} from './get-element-aggregate.query'
import { GetElementAggregateRequest } from './get-element-aggregate.request'

@Injectable()
/**
 * Fetches, flattens and returns the whole tree bellow a certain element
 */
export class GetDgraphElementAggregateService extends DgraphUseCase<
  GetElementAggregateRequest,
  GetElementQueryType | null
> {
  constructor(
    @Inject(DgraphTokens.DgraphProvider)
    protected readonly dgraphProvider: DgraphProvider,
    private flattenElementTreeService: FlattenElementTreeService,
    private elementGuardService: ElementGuardService,
  ) {
    super(dgraphProvider)
  }

  protected async executeTransaction(
    { input: { elementId } }: GetElementAggregateRequest,
    txn: Txn,
  ) {
    const queryBuilder = new GetElementAggregateQuery().withUidFunc(elementId)
    const query = queryBuilder.build()
    const response = await txn.query(query)
    const result = response.getJson().query

    if (!result || !result.length || !result[0]) {
      return null
    }

    return result[0]
  }

  protected async validate({
    currentUser,
    input: { elementId },
  }: GetElementAggregateRequest): Promise<void> {
    await this.elementGuardService.validate(elementId, currentUser)
  }
}
