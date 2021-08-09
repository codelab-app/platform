import {
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphTag,
  DgraphUseCase,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetTagsRequest } from './get-tags.request'

@Injectable()
export class GetTagsService extends DgraphUseCase<
  GetTagsRequest,
  Array<DgraphTag>
> {
  protected async executeTransaction(request: GetTagsRequest, txn: Txn) {
    return await this.dgraph.getAll<DgraphTag>(txn, this.createQuery(request))
  }

  private createQuery(request: GetTagsRequest) {
    const {
      owner: { sub },
    } = request

    return new DgraphQueryBuilder()
      .setTypeFunc(DgraphEntityType.Tag)
      .addEqFilterDirective<DgraphTag>('ownerId', sub)
      .addBaseFields()
      .addExpandAll()
  }
}
