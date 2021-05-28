import { Txn } from 'dgraph-js-http'
import { DGraphService } from '../../infrastructure'
import { UseCase } from '../index'

export abstract class DgraphUseCase<
  TUseCaseRequestPort,
  TUseCaseDtoResponse,
  TValidationContext = Record<string, unknown>,
> implements UseCase<TUseCaseRequestPort, TUseCaseDtoResponse>
{
  protected constructor(protected dgraph: DGraphService) {}

  async execute(request: TUseCaseRequestPort): Promise<TUseCaseDtoResponse> {
    const validationContext = await this.validate(request)

    return await this.transactionWrapper((txn) =>
      this.executeTransaction(request, txn, validationContext),
    )
  }

  protected async transactionWrapper<TResult>(
    execute: (txn: Txn) => Promise<TResult>,
  ) {
    const txn = this.dgraph.client.newTxn()

    try {
      return await execute(txn)
    } finally {
      await txn.discard()
    }
  }

  protected abstract executeTransaction(
    request: TUseCaseRequestPort,
    txn: Txn,
    validationContext: TValidationContext,
  ): Promise<TUseCaseDtoResponse>

  protected async validate(
    request: TUseCaseRequestPort,
  ): Promise<TValidationContext> {
    return {} as TValidationContext
  }
}
