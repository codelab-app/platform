import { DgraphCreateUseCase } from '@codelab/backend/application'
import {
  DgraphCreateMutationJson,
  DgraphEntityType,
  DgraphRepository,
  DgraphUpdateMutationJson,
} from '@codelab/backend/infra'
import { CreateElementService } from '@codelab/backend/modules/element'
import { CreatePropService } from '@codelab/backend/modules/prop'
import { User } from '@codelab/backend/modules/user'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { PageValidator } from '../../domain/page.validator'
import { CreatePageRequest } from './create-page.request'

@Injectable()
export class CreatePageService extends DgraphCreateUseCase<CreatePageRequest> {
  constructor(
    dgraph: DgraphRepository,
    private pageValidator: PageValidator,
    private createElementService: CreateElementService,
    private createPropService: CreatePropService,
  ) {
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

  protected async getRoot(currentUser: User): Promise<Record<string, any>> {
    const { id: propId } = await this.createPropService.execute({
      currentUser,
      input: { data: '{}' },
    })

    return {
      'dgraph.type': [DgraphEntityType.Element],
      name: 'Root element',
      children: [],
      props: { uid: propId, 'dgraph.type': [DgraphEntityType.Prop] },
    }
  }

  protected async createMutation(
    { input: { appId, name, rootElement }, currentUser }: CreatePageRequest,
    blankNodeUid: string,
  ): Promise<Mutation> {
    let root = await this.getRoot(currentUser)

    if (rootElement) {
      const created = await this.createElementService.execute({
        input: rootElement,
        currentUser,
      })

      root = { uid: created.id }
    }

    const createPageJson: DgraphCreateMutationJson<any> = {
      uid: blankNodeUid,
      'dgraph.type': [DgraphEntityType.Page],
      name,
      root,
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
