import {
  CreateResponse,
  DgraphCreateUseCase,
} from '@codelab/backend/application'
import {
  DgraphApp,
  DgraphCreateMutationJson,
  DgraphEntityType,
  DgraphPage,
  DgraphRepository,
  DgraphUpdateMutationJson,
} from '@codelab/backend/infra'
import { AppValidator } from '@codelab/backend/modules/app'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { CreatePageRequest } from './create-page.request'

@Injectable()
export class CreatePageService extends DgraphCreateUseCase<CreatePageRequest> {
  constructor(dgraph: DgraphRepository, private appValidator: AppValidator) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: CreatePageRequest,
    txn: Txn,
  ): Promise<CreateResponse> {
    await this.validate(request)

    return this.dgraph.create(txn, (blankNodeUid) =>
      this.createMutation(request, blankNodeUid),
    )
  }

  protected createMutation(
    { input: { appId, name } }: CreatePageRequest,
    blankNodeUid: string,
  ): Mutation {
    const createPageJson: DgraphCreateMutationJson<DgraphPage> = {
      uid: blankNodeUid,
      'dgraph.type': [DgraphEntityType.Tree, DgraphEntityType.Page],
      name,
      root: {
        'dgraph.type': [DgraphEntityType.Node, DgraphEntityType.Element],
        name: 'Root element',
        children: [],
        props: '{}',
      },
    }

    const updateAppJson: DgraphUpdateMutationJson<DgraphApp> = {
      uid: appId,
      pages: { uid: blankNodeUid },
    }

    return {
      setJson: [createPageJson, updateAppJson],
    }
  }

  protected async validate({
    currentUser,
    input: { appId },
  }: CreatePageRequest): Promise<void> {
    await this.appValidator.existsAndIsOwnedBy(appId, currentUser)
  }
}
