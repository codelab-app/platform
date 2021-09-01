import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphComponent, DgraphRepository } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetComponentsInput } from './get-components.input'
import { getComponentsQuery } from './get-components.query'

@Injectable()
export class GetComponentsService extends DgraphUseCase<
  GetComponentsInput,
  Array<DgraphComponent>
> {
  constructor(dgraph: DgraphRepository) {
    super(dgraph)
  }

  protected async executeTransaction(input: GetComponentsInput, txn: Txn) {
    return this.dgraph.getAll<DgraphComponent>(txn, getComponentsQuery(input))
  }
}
