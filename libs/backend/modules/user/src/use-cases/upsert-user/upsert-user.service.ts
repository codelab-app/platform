import { DgraphEntityType, UseCasePort } from '@codelab/backend/abstract/core'
import {
  CreateResponse,
  DgraphCreateUseCase,
} from '@codelab/backend/application'
import { DgraphRepository, jsonMutation } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { GetUserService } from '../get-user'
import { UpsertUserDataInput } from './upsert-user.input'
import { UpsertUserRequest } from './upsert-user.request'

@Injectable()
export class UpsertUserService
  extends DgraphCreateUseCase<UpsertUserRequest>
  implements UseCasePort<UpsertUserRequest, CreateResponse>
{
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
          this.createUpdateMutation(user.id, request.input.data),
        )

        return { id: user.id }
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
    return jsonMutation({
      uid,
      auth0Id: data.auth0Id,
      // TODO: Remove any cast
      roles: data.roles as any,
    })
  }

  protected createMutation(
    { input: { data } }: UpsertUserRequest,
    blandNodeUid: string,
  ): Mutation {
    return jsonMutation({
      uid: blandNodeUid,
      auth0Id: data.auth0Id,
      'dgraph.type': [DgraphEntityType.User],
      // TODO: Remove any cast
      roles: data.roles as any,
      apps: [],
    })
  }
}
