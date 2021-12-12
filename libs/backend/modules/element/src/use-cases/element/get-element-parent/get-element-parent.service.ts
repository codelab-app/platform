import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphEntityType } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetElementParentInput } from './get-element-parent.input'

/**
 * Returns the parent of the requested element or null if there is not parent
 */
@Injectable()
export class GetElementParentService extends DgraphUseCase<
  GetElementParentInput,
  { parentId: string } | null
> {
  protected executeTransaction(
    request: GetElementParentInput,
    txn: Txn,
  ): Promise<{ parentId: string } | null> {
    return this.dgraph.getOneNamed<{ parentId: string }>(
      txn,
      this.createQuery(request),
      'query',
    )
  }

  private createQuery({ elementId }: GetElementParentInput) {
    return `{
      query(func: uid(${elementId})) @filter(type(${DgraphEntityType.Element})) @normalize {
        ~children {
          parentId: uid
        }
      }
    }`
  }
}
