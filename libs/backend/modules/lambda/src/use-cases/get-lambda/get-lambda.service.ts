import { DgraphUseCase } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { getLambdaQuery } from '../../lib/getLambdaQuery'
import { GetLambdaInput } from './get-lambda.input'

@Injectable()
export class GetLambdaService extends DgraphUseCase<GetLambdaInput, any> {
  async executeTransaction(input: GetLambdaInput, txn: Txn) {
    const q = getLambdaQuery().setUidFunc(input.lambdaId)

    return this.dgraph.getOne(txn, q)
  }
}
