import { UseCasePort } from '@codelab/backend/abstract/core'
import { DgraphRepository } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { z } from 'zod'

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

  /**
   * Validate the return results if we provide a schema
   */
  protected schema?: z.ZodSchema<any>

  /**
   * Override to false to not return the parsed zod result, but the original object
   * Useful for when you want to return class instances, since zod strips them out
   * */
  protected returnParsed = true

  async execute(request: TUseCaseRequestPort): Promise<TUseCaseDtoResponse> {
    const results = await this.dgraph.transactionWrapper((txn) =>
      this.executeTransaction(request, txn),
    )

    if (this.schema) {
      const parseResult = this.schema.parse(results)

      if (this.returnParsed) {
        return parseResult
      } else {
        return results
      }
    }

    return results
  }

  protected abstract executeTransaction(
    request: TUseCaseRequestPort,
    txn: Txn,
  ): Promise<TUseCaseDtoResponse>
}
