import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphType, sortByUids } from '@codelab/backend/infra'
import { Role } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { getAdminTypesQuery, getUserTypesQuery } from './get-types.query'
import { GetTypesRequest } from './get-types.request'

@Injectable()
export class GetTypesService extends DgraphUseCase<
  GetTypesRequest,
  Array<DgraphType<any>>
> {
  protected async executeTransaction(
    { input, currentUser }: GetTypesRequest,
    txn: Txn,
  ) {
    if (currentUser.roles.includes(Role.Admin)) {
      return await this.dgraph
        .getAll<DgraphType<any>>(txn, getAdminTypesQuery(input))
        .then(sortByUids)
    }

    return await this.dgraph
      .getAll<DgraphType<any>>(txn, getUserTypesQuery(input, currentUser.id))
      .then(sortByUids)
  }
}
