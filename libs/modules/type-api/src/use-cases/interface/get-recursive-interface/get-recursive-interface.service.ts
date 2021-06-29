import { BaseDgraphFields, DgraphUseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
import { DgraphInterface, InterfaceDgraphFields } from '../../../models'
import { GetInterfaceRequest } from '../get-interface'
import { GetInterfaceQueryBuilder } from './get-recursive-interface.query'

@Injectable()
/** Returns the interface in its recursive form */
export class GetRecursiveInterfaceService extends DgraphUseCase<
  GetInterfaceRequest,
  DgraphInterface | null
> {
  protected async executeTransaction(
    { input: { interfaceId } }: GetInterfaceRequest,
    txn: Txn,
  ) {
    const query = new GetInterfaceQueryBuilder()
      .withUidFunc(interfaceId)
      .build()

    const result = await txn.query(query)
    const dataArray = (result?.getJson() as any)?.query || null

    if (!dataArray[0] || !dataArray[0][BaseDgraphFields.DgraphType]) {
      return null
    }

    return DgraphInterface.Schema.nullable().parse({
      ...dataArray[0],
      // Default to returning an empty array, because otherwise
      // it will go through the field resolver again or get stuck in some zod validation
      [InterfaceDgraphFields.Fields]:
        dataArray[0][InterfaceDgraphFields.Fields] || [],
    })
  }
}
