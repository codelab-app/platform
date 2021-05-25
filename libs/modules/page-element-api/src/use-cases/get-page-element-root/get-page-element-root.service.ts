import { DGraphService, DgraphUseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { PageElementRoot } from '../../models'
import { GetPageElementRootInput } from './get-page-element-root.input'

@Injectable()
export class GetPageElementRootService extends DgraphUseCase<
  GetPageElementRootInput,
  PageElementRoot
> {
  constructor(dgraph: DGraphService) {
    super(dgraph)
  }

  async executeTransaction(request: GetPageElementRootInput, txn: Txn) {
    return Promise.resolve(null as any)

    return txn.query(`
        
    `)
  }
}
