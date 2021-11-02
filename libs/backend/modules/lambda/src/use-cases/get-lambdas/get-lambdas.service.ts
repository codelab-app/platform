import { DgraphUseCase } from '@codelab/backend/application'
import { LambdaSchema } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { getLambdaQuery } from '../get-lambda/get-lambda.query'
import { GetLambdasRequest } from './get-lambdas.request'

@Injectable()
export class GetLambdasService extends DgraphUseCase<
  GetLambdasRequest,
  Array<any>
> {
  protected schema = LambdaSchema.array()

  async executeTransaction(request: GetLambdasRequest, txn: Txn) {
    const q = getLambdaQuery(
      `@filter(eq(ownerId, "${request.currentUser.id}"))`,
      'query',
    )

    return this.dgraph.getAllNamed<any>(txn, q, 'query')
  }
}
