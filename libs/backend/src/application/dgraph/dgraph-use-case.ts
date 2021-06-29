import { Inject } from '@nestjs/common'
import { Txn } from 'dgraph-js'
import { DgraphProvider, DgraphTokens } from '../../infrastructure'
import { UseCase } from '../use-case'

export abstract class DgraphUseCase<
  TUseCaseRequestPort,
  TUseCaseDtoResponse,
  TValidationContext = void,
> implements UseCase<TUseCaseRequestPort, TUseCaseDtoResponse>
{
  constructor(
    @Inject(DgraphTokens.DgraphProvider)
    protected readonly dgraphProvider: DgraphProvider,
  ) {}

  async execute(request: TUseCaseRequestPort): Promise<TUseCaseDtoResponse> {
    const validationContext = await this.validate(request)

    return await this.transactionWrapper((txn) =>
      this.executeTransaction(request, txn, validationContext),
    )
  }

  protected async transactionWrapper<TResult>(
    execute: (txn: Txn) => Promise<TResult>,
  ) {
    const txn = this.dgraphProvider.client.newTxn()

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
