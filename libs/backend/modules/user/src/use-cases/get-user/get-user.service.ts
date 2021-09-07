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
    const { id } = request

    if (id) {
      return await this.dgraph.getOne<DgraphUser>(txn, this.createByIdQuery(id))
    }

    throw new Error('Invalid parameters')

    // return await this.auth0
    //   .getManagementClient()
    //   .getUser({ id: request.userId })
  }

  protected createByIdQuery(id: string) {
    return new DgraphQueryBuilder()
      .setUidFunc(id)
      .addTypeFilterDirective(DgraphEntityType.User)
      .addBaseFields()
      .addExpandAll()
  }
}
