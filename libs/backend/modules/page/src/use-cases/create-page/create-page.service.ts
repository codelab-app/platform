import { DgraphCreateUseCase } from '@codelab/backend/application'
import {
  DgraphCreateMutationJson,
  DgraphEntityType,
  DgraphRepository,
  DgraphUpdateMutationJson,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { PageValidator } from '../../domain/page.validator'
import { CreatePageRequest } from './create-page.request'

@Injectable()
export class CreatePageService extends DgraphCreateUseCase<CreatePageRequest> {
  constructor(dgraph: DgraphRepository, private pageValidator: PageValidator) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: CreatePageRequest,
    txn: Txn,
  ): Promise<any> {
    await this.validate(request)

    return this.dgraph.create(txn, (blankNodeUid) =>
      this.createMutation(request, blankNodeUid),
    )
  }

  protected createMutation(
    { input: { appId, name } }: CreatePageRequest,
    blankNodeUid: string,
  ): Mutation {
    const createPageJson: DgraphCreateMutationJson<any> = {
      uid: blankNodeUid,
      'dgraph.type': [DgraphEntityType.Page],
      name,
      root: {
        'dgraph.type': [DgraphEntityType.Element],
        name: 'Root element',
        children: [],
        props: '{}',
      },
    }

    const updateAppJson: DgraphUpdateMutationJson<any> = {
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
    await this.pageValidator.validateApp(appId, currentUser)
  }
}
