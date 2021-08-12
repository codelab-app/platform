import {
  DgraphComponent,
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphRepository,
  DgraphUseCase,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetComponentRequest } from './get-component.request'

@Injectable()
export class GetComponentService extends DgraphUseCase<
  GetComponentRequest,
  DgraphComponent | null
> {
  constructor(dgraph: DgraphRepository) {
    super(dgraph)
  }

  protected async executeTransaction(request: GetComponentRequest, txn: Txn) {
    const {
      input: { componentId },
    } = request

    return this.dgraph.getOne<DgraphComponent>(
      txn,
      this.createQuery(componentId),
    )
  }

  private createQuery(componentId: string) {
    return new DgraphQueryBuilder()
      .addBaseFields()
      .addTypeFilterDirective(DgraphEntityType.Component)
      .setUidFunc(componentId)
      .addExpandAll((f) => f.addExpandAllRecursive(2))
  }
}
