import { DgraphCreateUseCase } from '@codelab/backend/application'
import {
  DgraphEntityType,
  DgraphUser,
  jsonMutation,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { CreateUserRequest } from './create-user.request'

@Injectable()
export class CreateUserService extends DgraphCreateUseCase<CreateUserRequest> {
  protected executeTransaction(request: CreateUserRequest, txn: Txn) {
    return this.dgraph.create(txn, (blankNodeUid) =>
      this.createMutation(request, blankNodeUid),
    )
  }

  protected createMutation(
    { input: { auth0Id }, currentUser }: CreateUserRequest,
    blandNodeUid: string,
  ): Mutation {
    return jsonMutation<DgraphUser>({
      uid: blandNodeUid,
      'dgraph.type': [DgraphEntityType.User],
      // TODO: Remove any cast
      roles: currentUser.roles as any,
      apps: [],
    })
  }
}
