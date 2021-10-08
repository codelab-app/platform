import { DgraphUseCase } from '@codelab/backend/application'
import { sortByIds } from '@codelab/backend/infra'
import { IType, Role, TypeSchema } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { getAdminTypesQuery, getUserTypesQuery } from './get-types.query'
import { GetTypesRequest } from './get-types.request'

@Injectable()
export class GetTypesService extends DgraphUseCase<
  GetTypesRequest,
  Array<IType>
> {
  protected schema = TypeSchema.array()

  protected async executeTransaction(
    { input, currentUser }: GetTypesRequest,
    txn: Txn,
  ) {
    if (currentUser.roles.includes(Role.Admin)) {
      return await this.dgraph
        .getAllNamed<IType>(txn, getAdminTypesQuery(input, 'query'), 'query')
        .then(sortByIds)
    }

    return await this.dgraph
      .getAllNamed<IType>(
        txn,
        getUserTypesQuery(input, currentUser.id, 'query'),
        'query',
      )
      .then(sortByIds)
  }
}
