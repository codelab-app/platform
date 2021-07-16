import {
  DgraphElement,
  DgraphRepository,
  DgraphTree,
  DgraphUseCase,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js'
import { PageValidator } from '../../page.validator'
import { DeletePageRequest } from './delete-page.request'

@Injectable()
export class DeletePageService extends DgraphUseCase<DeletePageRequest, void> {
  constructor(
    protected readonly dgraph: DgraphRepository,
    private pageValidator: PageValidator,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: DeletePageRequest,
    txn: Txn,
  ): Promise<void> {
    const {
      input: { pageId },
    } = request

    const validationContext = await this.validate(request)
    const deletePageAppMu = new Mutation()

    deletePageAppMu.setDelNquads(
      `<${validationContext.appId}> <pages> <${pageId}> .`,
    )

    // We need to delete related page elements and props too,
    // otherwise they will become inaccessible garbage
    // So perform a Upsert mutation which will query for the ids of the page, all elements and their props and then delete them

    await this.dgraph.executeUpsertDeleteAll(
      txn,
      (q) =>
        q
          .addJsonFields<DgraphTree<any, any> & DgraphElement>({
            root: true,
            children: true,
            props: true,
          })
          .setUidFunc(pageId),
      [deletePageAppMu],
    )
  }

  protected async validate({
    currentUser,
    input: { pageId },
  }: DeletePageRequest) {
    return await this.pageValidator.existsAndIsOwnedBy(pageId, currentUser)
  }
}
