import { DgraphLambda, DgraphUseCase } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { getLambdaQuery } from '../get-lambda/get-lambda.query'
import { GetLambdasRequest } from './get-lambdas.request'

@Injectable()
export class GetLambdasService extends DgraphUseCase<
  GetLambdasRequest,
  Array<DgraphLambda>
> {
  async executeTransaction(request: GetLambdasRequest, txn: Txn) {
    const q = getLambdaQuery().setFilterFuncString(
      `eq(ownerId, "${request.currentUser.id}")`,
    )

    return this.dgraph.getAll<DgraphLambda>(txn, q)
  }
}
