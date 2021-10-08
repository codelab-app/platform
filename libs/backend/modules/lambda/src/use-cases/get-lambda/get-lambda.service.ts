import { DgraphUseCase } from '@codelab/backend/application'
import { ILambda, LambdaSchema } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetLambdaInput } from './get-lambda.input'
import { getLambdaQuery } from './get-lambda.query'

@Injectable()
export class GetLambdaService extends DgraphUseCase<
  GetLambdaInput,
  ILambda | null
> {
  protected schema = LambdaSchema.nullable().optional()

  async executeTransaction(input: GetLambdaInput, txn: Txn) {
    const q = getLambdaQuery(`@filter(uid(${input.lambdaId}))`, 'query')

    return this.dgraph.getOneNamed<ILambda>(txn, q, 'query')
  }
}
