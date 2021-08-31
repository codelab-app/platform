import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphComponent, DgraphRepository } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { getComponentQuery } from './get-component.query'
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
    return getComponentQuery().setUidFunc(componentId)
  }
}
