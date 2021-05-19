import { DGraphService, UseCase } from '@codelab/backend'
import { Txn } from 'dgraph-js-http'

export abstract class DgraphUseCase<TUseCaseRequestPort, TUseCaseDtoResponse>
  implements UseCase<TUseCaseRequestPort, TUseCaseDtoResponse>
{
  protected constructor(protected dgraph: DGraphService) {}

  async execute(request: TUseCaseRequestPort): Promise<TUseCaseDtoResponse> {
    return await this.transactionWrapper((txn) =>
      this.executeTransaction(request, txn),
    )
  }

  async transactionWrapper<TResult>(execute: (txn: Txn) => Promise<TResult>) {
    const txn = this.dgraph.client.newTxn()

    try {
      return await execute(txn)
    } finally {
      await txn.discard()
    }
  }

  abstract executeTransaction(
    request: TUseCaseRequestPort,
    txn: Txn,
  ): Promise<TUseCaseDtoResponse>
}
