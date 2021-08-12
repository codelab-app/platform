import { UseCasePort } from '@codelab/backend/abstract/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { DgraphRepository } from '../../infrastructure'

/**
 * Wraps the execution inside a dgraph transaction and injects the dgraph repository service
 */
@Injectable()
export abstract class DgraphUseCase<
  TUseCaseRequestPort,
  TUseCaseDtoResponse = void,
> implements UseCasePort<TUseCaseRequestPort, TUseCaseDtoResponse>
{
  constructor(protected readonly dgraph: DgraphRepository) {}

  async execute(request: TUseCaseRequestPort): Promise<TUseCaseDtoResponse> {
    return await this.dgraph.transactionWrapper((txn) =>
      this.executeTransaction(request, txn),
    )
  }

  protected abstract executeTransaction(
    request: TUseCaseRequestPort,
    txn: Txn,
  ): Promise<TUseCaseDtoResponse>
}
