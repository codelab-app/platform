import {
  DgraphAtom,
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphTag,
  DgraphUseCase,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetTagInput } from './get-tag.input'

@Injectable()
export class GetTagService extends DgraphUseCase<
  GetTagInput,
  DgraphTag | null
> {
  protected async executeTransaction(request: GetTagInput, txn: Txn) {
    const {
      where: { id, name },
    } = request

    if (id) {
      return this.dgraph.getOne<DgraphTag>(
        txn,
        GetTagService.createWhereIdQuery(id),
      )
    }

    if (name) {
      return this.dgraph.getOne<DgraphTag>(
        txn,
        GetTagService.createWhereNameQuery(name),
      )
    }

    throw new Error('Invalid GetTagInput')
  }

  private static createWhereIdQuery(id: string) {
    return new DgraphQueryBuilder()
      .setUidFunc(id)
      .addTypeFilterDirective(DgraphEntityType.Tag)
      .addBaseFields()
      .addExpandAll()
  }

  private static createWhereNameQuery(name: string) {
    return new DgraphQueryBuilder()
      .setTypeFunc(DgraphEntityType.Tag)
      .addEqFilterDirective<DgraphAtom>('name', name)
      .addBaseFields()
      .addExpandAll()
  }
}
