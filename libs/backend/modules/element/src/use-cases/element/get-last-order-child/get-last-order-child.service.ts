import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphQueryField,
  DgraphRepository,
} from '@codelab/backend/infra'
import { Nullable } from '@codelab/shared/abstract/types'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { isNumber } from 'lodash'
import { GetLastOrderChildInput } from './get-last-order-child.input'
import { GetLastOrderChildResponse } from './get-last-order-child.response'

/**
 * Returns a direct child of the requested Element, which has the greatest order number
 * or null if none found
 */
@Injectable()
export class GetLastOrderChildService extends DgraphUseCase<
  GetLastOrderChildInput,
  Nullable<GetLastOrderChildResponse>
> {
  constructor(protected readonly dgraph: DgraphRepository) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: GetLastOrderChildInput,
    txn: Txn,
  ) {
    const result = await this.dgraph.getOne<any>(txn, this.createQuery(request))

    if (result) {
      const children = result.children

      if (children && children[0]) {
        const uid = children[0].uid
        const order = children[0]['children|order']

        if (uid && isNumber(order)) {
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
