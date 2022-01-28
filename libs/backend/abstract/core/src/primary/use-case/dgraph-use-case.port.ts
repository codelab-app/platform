import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { UseCasePort } from './use-case.port'

/**
 * Wraps the execution inside a dgraph transaction and injects the dgraph repository service
 */
@Injectable()
export abstract class DgraphUseCasePort<
  TUseCaseRequestPort,
  TUseCaseDtoResponse = void,
> implements UseCasePort<TUseCaseRequestPort, TUseCaseDtoResponse>
{
  protected abstract executeTransaction(
    request: TUseCaseRequestPort,
    txn: Txn,
  ): Promise<TUseCaseDtoResponse>

  abstract execute(request: TUseCaseRequestPort): Promise<TUseCaseDtoResponse>
}
