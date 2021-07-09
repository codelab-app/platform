import { DgraphProvider, DgraphTokens, DgraphUseCase } from '@codelab/backend'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
import { GetLastOrderChildInput } from './get-last-order-child.input'
import { GetLastOrderChildResponse } from './get-last-order-child.response'

@Injectable()
/**
 * Returns a direct child of the requested Element, which has the greatest order number
 * or null if none found
 */
export class GetLastOrderChildService extends DgraphUseCase<
  GetLastOrderChildInput,
  GetLastOrderChildResponse | null
> {
  constructor(
    @Inject(DgraphTokens.DgraphProvider)
    protected readonly dgraphProvider: DgraphProvider,
  ) {
    super(dgraphProvider)
  }

  protected async executeTransaction(
    request: GetLastOrderChildInput,
    txn: Txn,
  ) {
    const query = `
       {
         query(func: uid(${request.elementId}))    {
            uid
            Element.children @facets(orderdesc: order) (first:1) {
              uid
            }
          }
      }
    `

    const result = await txn.query(query)
    const queryData = (result.getJson() as any).query

    if (queryData && queryData[0]) {
      const children = queryData[0]['Element.children']

      if (children && children[0]) {
        const uid = children[0].uid
        const order = children[0]['Element.children|order']

        if (uid && typeof order === 'number') {
          return new GetLastOrderChildResponse(uid, order)
        }
      }
    }

    return null
  }
}
