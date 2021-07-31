import {
  DgraphApp,
  DgraphPage,
  DgraphRepository,
  DgraphUpdateMutationJson,
  DgraphUseCase,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { PageValidator } from '../../page.validator'
import { UpdatePageRequest } from './update-page.request'

@Injectable()
export class UpdatePageService extends DgraphUseCase<UpdatePageRequest> {
  constructor(dgraph: DgraphRepository, private pageValidator: PageValidator) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: UpdatePageRequest,
    txn: Txn,
  ): Promise<void> {
    const { appId: existingAppId } = await this.validate(request)

    await this.dgraph.executeMutation(
      txn,
      this.createMutation(request, existingAppId),
    )
  }

  private createMutation(
    {
      input: {
        pageId,
        updateData: { appId, name },
      },
    }: UpdatePageRequest,
    existingAppId: string,
  ) {
    const mu: Mutation = {}
    const setMutations = []

    const updatePageJson: DgraphUpdateMutationJson<DgraphPage> = {
      uid: pageId,
      name,
    }

    setMutations.push(updatePageJson)

    if (existingAppId !== appId) {
      const updateAppMutation: DgraphUpdateMutationJson<DgraphApp> = {
        uid: appId,
        pages: { uid: pageId },
      }

      setMutations.push(updateAppMutation)
      mu.deleteNquads = `<${existingAppId}> pages <${pageId}> .`
    }

    mu.setJson = setMutations

    return mu
  }

  protected async validate({
    currentUser,
    input: { pageId },
  }: UpdatePageRequest) {
    return this.pageValidator.existsAndIsOwnedBy(pageId, currentUser)
  }
}
