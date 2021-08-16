import { DgraphUseCase } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { SeedTagTreeRequest } from './seed-tag-tree.request'

@Injectable()
export class SeedTagTreeService extends DgraphUseCase<any, any> {
  protected async executeTransaction(request: SeedTagTreeRequest, txn: Txn) {
    // await this.validate(request)

    // await this.dgraph.executeMutation(txn, this.createMutation(request))

    return await Promise.resolve({})
  }

  // private createMutation(request: SeedTagTreeRequest): Mutation {
  //   const setJson: DgraphCreateMutationJson<DgraphTag> = {}

  //   return { setJson }
  // }

  // protected async validate(request: SeedTagTreeRequest>) {
  //  return
  // }
}
