import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphApp,
  DgraphCreateMutationJson,
  DgraphEntityType,
  DgraphRepository,
  DgraphUpdateMutationJson,
  DgraphUser,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { GetAppService } from '../get-app'
import { CreateAppRequest } from './create-app.request'

@Injectable()
export class CreateAppService extends DgraphUseCase<
  CreateAppRequest,
  DgraphApp
> {
  constructor(dgraph: DgraphRepository, private getAppService: GetAppService) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: CreateAppRequest,
    txn: Txn,
  ): Promise<DgraphApp> {
    const { id } = await this.dgraph.create(txn, (blankNodeUid) =>
      this.createMutation(request, blankNodeUid),
    )

    const app = await this.getAppService.execute({
      input: { byId: { appId: id } },
      currentUser: request.currentUser,
    })

    if (!app) {
      throw new Error('App not created')
    }

    return app
  }

  protected createMutation(
    { input: { name }, currentUser }: CreateAppRequest,
    blankNodeUid: string,
  ): Mutation {
    const createAppJson: DgraphCreateMutationJson<DgraphApp> = {
      uid: blankNodeUid,
      'dgraph.type': [DgraphEntityType.App],
      name,
      ownerId: currentUser.id,
    }

    const updateUserJson: DgraphUpdateMutationJson<DgraphUser> = {
      uid: currentUser.id,
      apps: {
        uid: blankNodeUid,
      },
    }

    return {
      setJson: [createAppJson, updateUserJson],
    }
  }
}
