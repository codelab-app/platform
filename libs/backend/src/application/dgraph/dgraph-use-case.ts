import { Txn } from 'dgraph-js-http'
import { DGraphService } from '../../infrastructure'
import { UseCase } from '../index'

export abstract class DgraphUseCase<TUseCaseRequestPort, TUseCaseDtoResponse>
  implements UseCase<TUseCaseRequestPort, TUseCaseDtoResponse>
{
  protected constructor(protected dgraph: DGraphService) {}

  async execute(request: TUseCaseRequestPort): Promise<TUseCaseDtoResponse> {
    return await this.transactionWrapper((txn) =>
      this.executeTransaction(request, txn),
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
  ): Promise<TUseCaseDtoResponse>

  protected async validate(request: TUseCaseRequestPort) {
    return
  }
}
