import {
  DgraphElement,
  DgraphEntityType,
  DgraphRepository,
  DgraphUseCase,
  NotFoundError,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { ElementValidator } from '../../element.validator'
import { getElementGraphQuery } from './get-element-graph.query'
import { GetElementGraphRequest } from './get-element-graph.request'

@Injectable()
/**
 * Recursively gets the entire tree starting from the root Element node
 */
export class GetElementGraphService extends DgraphUseCase<
  GetElementGraphRequest,
  DgraphElement
> {
  constructor(
    protected readonly dgraph: DgraphRepository,
    private elementGuardService: ElementValidator,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: GetElementGraphRequest,
    txn: Txn,
  ): Promise<DgraphElement> {
    await this.validate(request)

    return this.dgraph.getOneOrThrow(
      txn,
      GetElementGraphService.createQuery(request),
      () => new NotFoundError('Element not found'),
    )
  }

  protected async validate({
    currentUser,
    input: { elementId },
  }: GetElementGraphRequest): Promise<void> {
    await this.elementGuardService.existsAndIsOwnedBy(elementId, currentUser)
  }

  private static createQuery({ input: { elementId } }: GetElementGraphRequest) {
    return getElementGraphQuery()
      .setUidFunc(elementId)
      .addTypeFilterDirective(DgraphEntityType.Element)
  }
}
