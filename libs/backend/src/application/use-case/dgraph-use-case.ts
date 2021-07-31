import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
import { DgraphRepository } from '../../infrastructure'
import { UseCase } from './use-case'

/**
 * Wraps the execution inside a dgraph transaction and injects the dgraph repository service
 */
@Injectable()
export abstract class DgraphUseCase<
  TUseCaseRequestPort,
  TUseCaseDtoResponse = void,
> implements UseCase<TUseCaseRequestPort, TUseCaseDtoResponse>
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
