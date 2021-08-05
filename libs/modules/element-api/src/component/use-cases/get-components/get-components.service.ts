import {
  DgraphComponent,
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphRepository,
  DgraphUseCase,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'

@Injectable()
export class GetComponentsService extends DgraphUseCase<
  Record<string, never>,
  Array<DgraphComponent>
> {
  constructor(dgraph: DgraphRepository) {
    super(dgraph)
  }

  protected async executeTransaction(_: never, txn: Txn) {
    return this.dgraph.getAll<DgraphComponent>(txn, this.createQuery())
  }

  private createQuery() {
    return new DgraphQueryBuilder()
      .addBaseFields()
      .setTypeFunc(DgraphEntityType.Component)
      .addExpandAll((f) => f.addExpandAllRecursive(2))
  }
}
