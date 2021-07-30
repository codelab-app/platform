import { DgraphUseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
import { getLambdaQuery } from '../../lib/getLambdaQuery'
import { GetLambdasRequest } from './get-lambdas.request'

@Injectable()
export class GetLambdasService extends DgraphUseCase<GetLambdasRequest, any> {
  async executeTransaction(request: GetLambdasRequest, txn: Txn) {
    const q = getLambdaQuery().setFilterFuncString(
      `eq(ownerId, "${request.ownerId}")`,
    )

    return this.dgraph.getAll(txn, q)
  }
}
