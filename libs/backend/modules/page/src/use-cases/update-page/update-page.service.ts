import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository, jsonMutation } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { PageValidator } from '../../domain/page.validator'
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

    await this.dgraph.executeMutation(txn, await this.createMutation(request))
  }

  private async createMutation({
    input: {
      pageId,
      updateData: { name },
    },
  }: UpdatePageRequest) {
    const root = null

    return jsonMutation<any>({
      uid: pageId,
      name,
      root,
    })
  }

  protected async validate({
    currentUser,
    input: { pageId },
  }: UpdatePageRequest) {
    return this.pageValidator.existsAndIsOwnedBy(pageId, currentUser)
  }
}
