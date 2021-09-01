import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphTag,
  DgraphTagTree,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetTagsRequest } from './get-tags.request'

@Injectable()
export class GetTagsService extends DgraphUseCase<
  GetTagsRequest,
  Array<DgraphTag>
> {
  protected async executeTransaction(request: GetTagsRequest, txn: Txn) {
    return await this.dgraph.getAll<DgraphTag>(
      txn,
      GetTagsService.createQuery(request),
    )
  }

  private static createQuery(request: GetTagsRequest) {
    const { currentUser } = request

    return new DgraphQueryBuilder()
      .setTypeFunc(DgraphEntityType.Tag)
      .addEqFilterDirective<DgraphTagTree>('ownerId', currentUser.id)
      .addRecurseDirective()
      .addBaseFields()
      .addExpandAll()
  }
}
