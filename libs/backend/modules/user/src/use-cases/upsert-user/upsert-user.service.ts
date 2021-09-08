import { DgraphCreateUseCase } from '@codelab/backend/application'
import {
  DgraphEntityType,
  DgraphRepository,
  DgraphUser,
  jsonMutation,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { GetUserService } from '../get-user'
import { UpsertUserDataInput } from './upsert-user.input'
import { UpsertUserRequest } from './upsert-user.request'

@Injectable()
export class UpsertUserService extends DgraphCreateUseCase<UpsertUserRequest> {
  constructor(
    dgraph: DgraphRepository,
    private getUserService: GetUserService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(request: UpsertUserRequest, txn: Txn) {
    const { where } = request.input

    if (where?.id && where?.auth0Id) {
      throw new Error('At most 1 where')
    }

    if (where?.id) {
      const user = await this.getUserService.execute({ id: where.id })

      if (user) {
        await this.dgraph.executeMutation(
          txn,
          this.createUpdateMutation(where.id, request.input.data),
        )

        return { id: where.id }
      }
    }

    if (where?.auth0Id) {
      const user = await this.getUserService.execute({ auth0Id: where.auth0Id })

      if (user) {
        await this.dgraph.executeMutation(
          txn,
          this.createUpdateMutation(user.uid, request.input.data),
        )

        return { id: user.uid }
      }
    }

    return this.dgraph.create(txn, (blankNodeUid) =>
      this.createMutation(request, blankNodeUid),
    )
  }

  protected createUpdateMutation(
    uid: string,
    data: UpsertUserDataInput,
  ): Mutation {
    return jsonMutation<DgraphUser>({
      uid,
      auth0Id: data.auth0Id,
    })
  }

  protected createMutation(
    { input: { data, where }, currentUser }: UpsertUserRequest,
    blandNodeUid: string,
  ): Mutation {
    return jsonMutation<DgraphUser>({
      uid: blandNodeUid,
      auth0Id: data.auth0Id,
      'dgraph.type': [DgraphEntityType.User],
      // TODO: Remove any cast
      roles: currentUser.roles as any,
      apps: [],
    })
  }
}
