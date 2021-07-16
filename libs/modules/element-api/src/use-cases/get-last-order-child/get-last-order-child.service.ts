import {
  DgraphElement,
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphQueryField,
  DgraphRepository,
  DgraphUseCase,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
import { GetLastOrderChildInput } from './get-last-order-child.input'
import { GetLastOrderChildResponse } from './get-last-order-child.response'

/**
 * Returns a direct child of the requested Element, which has the greatest order number
 * or null if none found
 */
@Injectable()
export class GetLastOrderChildService extends DgraphUseCase<
  GetLastOrderChildInput,
  GetLastOrderChildResponse | null
> {
  constructor(protected readonly dgraph: DgraphRepository) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: GetLastOrderChildInput,
    txn: Txn,
  ) {
    const result = await this.dgraph.getOne<DgraphElement>(
      txn,
      this.createQuery(request),
    )

    if (result) {
      const children = result.children

      if (children && children[0]) {
        const uid = children[0].uid
        const order = children[0]['children|order']

        if (uid && typeof order === 'number') {
          return new GetLastOrderChildResponse(uid, order)
        }
      }
    }

    return null
  }

  protected createQuery({ elementId }: GetLastOrderChildInput) {
    /**
      *{
         query(func: uid(${request.elementId}))    {
            uid
            children @facets(orderdesc: order) (first:1) {
              uid
            }
          }
        }
     */
    return new DgraphQueryBuilder()
      .addTypeFilterDirective(DgraphEntityType.Element)
      .setUidFunc(elementId)
      .addBaseFields()
      .addFields(
        new DgraphQueryField(
          `children @facets(orderdesc: order) (first:1)`,
        ).addBaseInnerFields(),
      )
  }
}
