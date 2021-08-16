import {
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphTagTree,
  DgraphUseCase,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetTagGraphRequest } from './get-tag-graph.request'

@Injectable()
export class GetTagGraphService extends DgraphUseCase<
  GetTagGraphRequest,
  DgraphTagTree | null
> {
  protected async executeTransaction(request: GetTagGraphRequest, txn: Txn) {
    return await this.dgraph.getOne<DgraphTagTree>(
      txn,
      GetTagGraphService.createQuery(request),
    )
  }

  static createQuery(request: GetTagGraphRequest) {
    const { currentUser } = request

    return new DgraphQueryBuilder()
      .addBaseFields()
      .addExpandAll()
      .addEqFilterDirective('ownerId', currentUser.id)
      .setTypeFunc(DgraphEntityType.TagTree)
      .addRecurseDirective()
  }

  async createRootTagQuery(request: GetTagGraphRequest) {
    return this.dgraph.transactionWrapper((txn) =>
      this.dgraph.getOne<DgraphTagTree>(
        txn,
        GetTagGraphService.createQuery(request),
      ),
    )
  }
}
