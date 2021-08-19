import { DgraphLambda, DgraphUseCase } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetLambdaInput } from './get-lambda.input'
import { getLambdaQuery } from './get-lambda.query'

@Injectable()
export class GetLambdaService extends DgraphUseCase<
  GetLambdaInput,
  DgraphLambda | null
> {
  async executeTransaction(input: GetLambdaInput, txn: Txn) {
    const q = getLambdaQuery().setUidFunc(input.lambdaId)

    return await this.dgraph.getOne<DgraphLambda>(txn, q)
  }
}
