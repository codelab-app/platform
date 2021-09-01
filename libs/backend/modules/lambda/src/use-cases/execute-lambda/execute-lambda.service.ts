import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetLambdaService } from '../get-lambda'
import { ExecuteLambdaInput } from './execute-lambda.input'

@Injectable()
export class ExecuteLambdaService extends DgraphUseCase<
  ExecuteLambdaInput,
  any
> {
  constructor(
    dgraph: DgraphRepository,
    private readonly getLambdaService: GetLambdaService,
  ) {
    super(dgraph)
  }

  async executeTransaction(input: ExecuteLambdaInput, txn: Txn) {
    const lambda = await this.getLambdaService.executeTransaction(input, txn)

    return null
  }
}
