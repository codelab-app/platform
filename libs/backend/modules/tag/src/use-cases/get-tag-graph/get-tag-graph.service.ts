import {
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphTag,
  DgraphUseCase,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetTagGraphRequest } from './get-tag-graph.request'

@Injectable()
export class GetTagGraphService extends DgraphUseCase<
  GetTagGraphRequest,
  DgraphTag
> {
  protected async executeTransaction(request: GetTagGraphRequest, txn: Txn) {
    return await this.dgraph.getOneOrThrow<DgraphTag>(
      txn,
      GetTagGraphService.createQuery(request),
    )
  }

  private static createQuery(request: GetTagGraphRequest) {
    return (
      new DgraphQueryBuilder()
        .addBaseFields()
        .addRecurseDirective()
        // .addExpandAll()
        //   .addFields(
        //     `
        //   name
        //   children @facets(order
        // `,
        //   )
        // .setUidFunc(request.input.id)
        .addTypeFilterDirective(DgraphEntityType.Tag)
    )
  }
}
