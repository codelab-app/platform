import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphUser,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetUserInput } from './get-user.input'

@Injectable()
export class GetUserService extends DgraphUseCase<
  GetUserInput,
  DgraphUser | null
> {
  async executeTransaction(request: GetUserInput, txn: Txn) {
    const { id, auth0Id } = request

    if (id && auth0Id) {
      throw new Error('At most 1 where')
    }

    if (id) {
      return await this.dgraph.getOne<DgraphUser>(txn, this.createByIdQuery(id))
    }

    if (auth0Id) {
      return await this.dgraph.getOne<DgraphUser>(
        txn,
        this.createByAuth0IdQuery(auth0Id),
      )
    }

    throw new Error('Invalid parameters')
  }

  protected createByIdQuery(id: string) {
    return new DgraphQueryBuilder()
      .setUidFunc(id)
      .addTypeFilterDirective(DgraphEntityType.User)
      .addBaseFields()
      .addExpandAll()
  }

  protected createByAuth0IdQuery(auth0Id: string) {
    return new DgraphQueryBuilder()
      .setTypeFunc(DgraphEntityType.User)
      .addEqFilterDirective('auth0Id', auth0Id)
      .addBaseFields()
      .addExpandAll()
  }
}
