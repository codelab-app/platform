import {
  DgraphApp,
  DgraphCreateMutationJson,
  DgraphCreateUseCase,
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphTag,
  DgraphUseCase,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { Tag } from '../../tag.model'
import { GetTagInput } from './get-tag.input'
import { GetTagRequest } from './get-tag.request'

@Injectable()
export class GetTagService extends DgraphUseCase<GetTagRequest, DgraphTag> {
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
