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
import { GetTagsInput } from './get-tags.input'
import { GetTagsRequest } from './get-tags.request'

@Injectable()
export class GetTagsService extends DgraphUseCase<GetTagsRequest, DgraphTag> {
  protected async executeTransaction(request: GetTagsRequest, txn: Txn) {
    return await this.dgraph.getOneOrThrow<DgraphTag>(
      txn,
      this.createQuery(request),
    )
  }

  private createQuery(request: GetTagsRequest) {
    const {
      owner: { id },
    } = request

    return new DgraphQueryBuilder()
      .addEqFilterDirective<DgraphTag>('ownerId', id)
      .addBaseFields()
      .addExpandAll()
  }
}
