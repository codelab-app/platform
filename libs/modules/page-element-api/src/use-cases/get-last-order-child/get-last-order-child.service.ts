import { DGraphService, DgraphUseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetLastOrderChildInput } from './get-last-order-child.input'
import { GetLastOrderChildResponse } from './get-last-order-child.response'

@Injectable()
/**
 * Returns a direct child of the requested pageElement, which has the greatest order number
 * or null if none found
 */
export class GetLastOrderChildService extends DgraphUseCase<
  GetLastOrderChildInput,
  GetLastOrderChildResponse | null
> {
  constructor(dgraph: DGraphService) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: GetLastOrderChildInput,
    txn: Txn,
  ) {
    const query = `
       {
         query(func: uid(${request.pageElementId}))    {
            uid
            PageElement.children @facets(orderdesc: order) (first:1) {
              uid
            }
          }
      }
    `

    const result = await txn.query(query)
    const queryData = (result.data as any).query

    if (queryData && queryData[0]) {
      const children = queryData[0]['PageElement.children']

      if (children && children[0]) {
        const uid = children[0].uid
        const order = children[0]['PageElement.children|order']

        if (uid && order) {
          return new GetLastOrderChildResponse(uid, order)
        }
      }
    }

    return null
  }
}
