import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphTag,
} from '@codelab/backend/infra'
import { Role } from '@codelab/shared/abstract/core'
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
    const query = new DgraphQueryBuilder().setTypeFunc(DgraphEntityType.Tag)

    if (!currentUser.roles.includes(Role.Admin)) {
      query.addFilterDirective(`uid_in(owner, ${currentUser.id})`)
    }

    return query.addRecurseDirective().addBaseFields().addExpandAll()
  }
}
