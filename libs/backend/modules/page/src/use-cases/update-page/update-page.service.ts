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

    await this.dgraph.executeMutation(
      txn,
      UpdatePageService.createMutation(request, existingAppId),
    )
  }

  private static createMutation(
    {
      input: {
        pageId,
        updateData: { appId, name },
      },
    }: UpdatePageRequest,
    existingAppId: string,
  ) {
    // if (existingAppId !== appId) {
    //   const updateAppMutation: DgraphUpdateMutationJson<DgraphApp> = {
    //     uid: appId,
    //     pages: { uid: pageId },
    //   }
    //
    //   setMutations.push(updateAppMutation)
    //   mu.deleteNquads = `<${existingAppId}> pages <${pageId}> .`
    // }

    return jsonMutation<any>({
      uid: pageId,
      name,
    })
  }

  protected async validate({
    currentUser,
    input: { pageId },
  }: UpdatePageRequest) {
    return this.pageValidator.existsAndIsOwnedBy(pageId, currentUser)
  }
}
