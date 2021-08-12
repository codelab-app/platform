import {
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphTag,
  DgraphUseCase,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetTagRequest } from './get-tag.request'

@Injectable()
export class GetTagTreeService extends DgraphUseCase<GetTagRequest, DgraphTag> {
  protected async executeTransaction(request: GetTagRequest, txn: Txn) {
    return await this.dgraph.getOneOrThrow<DgraphTag>(
      txn,
      this.createQuery(request),
    )
  }

  private createQuery(request: GetTagRequest) {
    return new DgraphQueryBuilder()
      .setUidFunc(request.input.id)
      .addTypeFilterDirective(DgraphEntityType.Tag)
      .addBaseFields()
      .addExpandAll()
  }
}
