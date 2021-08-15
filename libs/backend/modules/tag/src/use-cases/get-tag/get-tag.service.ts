import {
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphTag,
  DgraphUseCase,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetTagInput } from './get-tag.input'

@Injectable()
export class GetTagService extends DgraphUseCase<GetTagInput, DgraphTag> {
  protected async executeTransaction(request: GetTagInput, txn: Txn) {
    return await this.dgraph.getOneOrThrow<DgraphTag>(
      txn,
      GetTagService.createQuery(request),
    )
  }

  private static createQuery(input: GetTagInput) {
    return new DgraphQueryBuilder()
      .setUidFunc(input.id)
      .addTypeFilterDirective(DgraphEntityType.Tag)
      .addBaseFields()
      .addExpandAll()
  }
}
