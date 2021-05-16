import { DGraphService, UseCase } from '@codelab/backend'
import { Txn } from 'dgraph-js-http'

export abstract class DgraphUseCase<TUseCaseRequestPort, TUseCaseDtoResponse>
  implements UseCase<TUseCaseRequestPort, TUseCaseDtoResponse> {
  protected constructor(protected dgraph: DGraphService) {}

  async execute(request: TUseCaseRequestPort): Promise<TUseCaseDtoResponse> {
    const txn = this.dgraph.client.newTxn()

    try {
      return await this.executeTransaction(request, txn)
    } finally {
      await txn.discard()
    }
  }

  abstract executeTransaction(
    request: TUseCaseRequestPort,
    txn: Txn,
  ): Promise<TUseCaseDtoResponse>
}
