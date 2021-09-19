import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphType, sortByUids } from '@codelab/backend/infra'
import { Role } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { getTypesQuery } from './get-types.query'
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
    const userId = currentUser.roles.includes(Role.Admin)
      ? null
      : currentUser.id

    return await this.dgraph
      .getAll<DgraphType<any>>(txn, getTypesQuery(input, userId))
      .then(sortByUids)
  }
}
