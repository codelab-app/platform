import {
  DgraphCreateMutationJson,
  DgraphTag,
  DgraphUseCase,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { SeedTagTreeInput } from './seed-tag-tree.input'
import { SeedTagTreeRequest } from './seed-tag-tree.request'

@Injectable()
export class SeedTagTreeService extends DgraphUseCase<any> {
  // constructor(dgraph: DgraphRepository) {
  //  super(dgraph)
  // }

  protected async executeTransaction(request: SeedTagTreeInput, txn: Txn) {
    // await this.validate(request)

    await this.dgraph.executeMutation(txn, this.createMutation(request))

    return await Promise.resolve({})
  }

  private createMutation(request: SeedTagTreeRequest): Mutation {
    const setJson: DgraphCreateMutationJson<DgraphTag> = {}

    return { setJson }
  }

  // protected async validate(request: SeedTagTreeRequest>) {
  //  return
  // }
}
