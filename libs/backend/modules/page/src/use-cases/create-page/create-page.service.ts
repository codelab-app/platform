import { DgraphCreateUseCase } from '@codelab/backend/application'
import {
  DgraphCreateMutationJson,
  DgraphEntityType,
  DgraphRepository,
  DgraphUpdateMutationJson,
} from '@codelab/backend/infra'
import {
  IElementRepository,
  IElementRepositoryToken,
} from '@codelab/backend/modules/element'
import { CreatePropService } from '@codelab/backend/modules/prop'
import { createElement, IUser } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { PageValidator } from '../../domain/page.validator'
import { CreatePageRequest } from './create-page.request'

@Injectable()
export class CreatePageService extends DgraphCreateUseCase<CreatePageRequest> {
  constructor(
    dgraph: DgraphRepository,
    private pageValidator: PageValidator,
    private createPropService: CreatePropService,
    @Inject(IElementRepositoryToken)
    private elementRepository: IElementRepository,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: CreatePageRequest,
    txn: Txn,
  ): Promise<any> {
    await this.validate(request)

    return this.dgraph.create(txn, (blankNodeUid) =>
      this.createMutation(request, blankNodeUid, txn),
    )
  }

  protected async createRoot(currentUser: IUser, txn: Txn) {
    const element = createElement({
      props: {},
      name: 'Root element',
      owner: currentUser?.id ? { id: currentUser.id } : undefined,
    })

    return this.elementRepository.create(element, txn)
  }

  protected async createMutation(
    { input: { appId, name }, currentUser }: CreatePageRequest,
    blankNodeUid: string,
    txn: Txn,
  ): Promise<Mutation> {
    const root = await this.createRoot(currentUser, txn)

    const createPageJson: DgraphCreateMutationJson<any> = {
      uid: blankNodeUid,
      'dgraph.type': [DgraphEntityType.Page],
      name,
      root: { uid: root.id },
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
