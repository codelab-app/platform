import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphEntityType, DgraphQueryBuilder } from '@codelab/backend/infra'
import { IGraph } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { TagEdge } from '../../domain/tag-edge.model'
import { TagVertex } from '../../domain/tag-vertex.model'
import { GetTagGraphRequest } from './get-tag-graph.request'

@Injectable()
export class GetTagGraphService extends DgraphUseCase<
  GetTagGraphRequest,
  IGraph<TagVertex, TagEdge> | null
> {
  protected async executeTransaction(request: GetTagGraphRequest, txn: Txn) {
    return await this.dgraph.getOne<IGraph<TagVertex, TagEdge>>(
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
      this.dgraph.getOne<IGraph<TagVertex, TagEdge>>(
        txn,
        GetTagGraphService.createQuery(request),
      ),
    )
  }
}
