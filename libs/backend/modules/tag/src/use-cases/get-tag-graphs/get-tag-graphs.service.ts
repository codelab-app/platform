import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphEntityType, DgraphQueryBuilder } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetTagGraphsRequest } from './get-tag-graphs.request'

@Injectable()
export class GetTagGraphsService extends DgraphUseCase<
  GetTagGraphsRequest,
  any
> {
  protected async executeTransaction(request: GetTagGraphsRequest, txn: Txn) {
    return await this.dgraph.executeQuery(txn, this.createQuery(request))
  }

  protected createQuery({ currentUser }: GetTagGraphsRequest) {
    return new DgraphQueryBuilder()
      .setTypeFunc(DgraphEntityType.Tag)
      .addFilterDirective(`uid_in(owner, ${currentUser.id})`)
      .addRecurseDirective()
      .addBaseFields()
      .addExpandAll()
  }
}
