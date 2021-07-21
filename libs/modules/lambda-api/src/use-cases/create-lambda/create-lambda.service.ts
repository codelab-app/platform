import { DgraphProvider, DgraphTokens, DgraphUseCase } from '@codelab/backend'
import { Inject, Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js'
import { CreateLambdaInput } from './create-lambda.input'

@Injectable()
export class CreateLambdaService extends DgraphUseCase<
  CreateLambdaInput,
  any,
  any
> {
  constructor(
    @Inject(DgraphTokens.DgraphProvider)
    protected readonly dgraphProvider: DgraphProvider,
  ) {
    super(dgraphProvider)
  }

  async executeTransaction(request: CreateLambdaInput, txn: Txn) {
    const mu = new Mutation()
    mu.setSetJson({
      name: request.name,
    })

    const mutationResult = txn.mutate(mu)

    await txn.commit()

    console.log(mutationResult)

    return mutationResult
  }
}
