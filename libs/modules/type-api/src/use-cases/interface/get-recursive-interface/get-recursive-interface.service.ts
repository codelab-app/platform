import { BaseDgraphFields, DgraphUseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { DgraphInterface } from '../../../models'
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
    const query = new GetInterfaceQueryBuilder().withUid(interfaceId).build()
    const result = await txn.query(query)
    const dataArray = (result?.data as any)?.query || null

    if (!dataArray[0][BaseDgraphFields.DgraphType]) {
      return null
    }

    return DgraphInterface.Schema.nullable().parse(dataArray[0] || null)
  }
}
