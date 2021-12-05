import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository, jsonMutation } from '@codelab/backend/infra'
import { CreateElementService } from '@codelab/backend/modules/element'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { PageValidator } from '../../domain/page.validator'
import { UpdatePageRequest } from './update-page.request'

@Injectable()
export class UpdatePageService extends DgraphUseCase<UpdatePageRequest> {
  constructor(
    dgraph: DgraphRepository,
    private pageValidator: PageValidator,
    private createElementService: CreateElementService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: UpdatePageRequest,
    txn: Txn,
  ): Promise<void> {
    const { appId: existingAppId } = await this.validate(request)

    await this.dgraph.executeMutation(
      txn,
      await this.createMutation(request, existingAppId),
    )
  }

  private async createMutation(
    {
      input: {
        pageId,
        updateData: { appId, name, rootElement },
      },
      currentUser,
    }: UpdatePageRequest,
    existingAppId: string,
  ) {
    let root = null

    if (rootElement) {
      const created = await this.createElementService.execute({
        input: rootElement,
        currentUser,
      })

      root = { uid: created.id }
    }

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
