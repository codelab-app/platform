import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphEntityType } from '@codelab/backend/infra'
import { IUser, UserSchema } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetUserInput } from './get-user.input'

@Injectable()
export class GetUserService extends DgraphUseCase<GetUserInput, IUser | null> {
  protected schema = UserSchema.nullable().optional()

  async executeTransaction(request: GetUserInput, txn: Txn) {
    const { id, auth0Id } = request

    if (id && auth0Id) {
      throw new Error('At most 1 where')
    }

    if (id) {
      return await this.dgraph.getOneNamed<IUser>(
        txn,
        this.createByIdQuery(id),
        'query',
      )
    }

    if (auth0Id) {
      return await this.dgraph.getOneNamed<IUser>(
        txn,
        this.createByAuth0IdQuery(auth0Id),
        'query',
      )
    }

    throw new Error('Invalid parameters')
  }

  protected createByIdQuery(id: string) {
    return `{
      query(func: type(${DgraphEntityType.User})) @filter(uid(${id})){
        id: uid
        auth0Id
        roles
      }
    }`
  }

  protected createByAuth0IdQuery(auth0Id: string) {
    return `{
      query(func: type(${DgraphEntityType.User})) @filter(eq(auth0Id, "${auth0Id}")){
        id: uid
        auth0Id
        roles
      }
    }`
  }
}
