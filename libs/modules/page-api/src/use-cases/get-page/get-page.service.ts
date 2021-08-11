import {
  DgraphEntityType,
  DgraphPage,
  DgraphQueryBuilder,
  DgraphRepository,
  DgraphUseCase,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { PageValidator } from '../../page.validator'
import { GetPageRequest } from './get-page.request'

@Injectable()
export class GetPageService extends DgraphUseCase<GetPageRequest, DgraphPage> {
  constructor(dgraph: DgraphRepository, private pageValidator: PageValidator) {
    super(dgraph)
  }

  protected async executeTransaction(request: GetPageRequest, txn: Txn) {
    const {
      input: { pageId },
    } = request

    await this.validate(request)

    return this.dgraph.getOneOrThrow<DgraphPage>(
      txn,
      GetPageService.createQuery(pageId),
    )
  }

  protected async validate({
    input: { pageId },
    currentUser,
  }: GetPageRequest): Promise<void> {
    await this.pageValidator.existsAndIsOwnedBy(pageId, currentUser)
  }

  private static createQuery(pageId: string) {
    return new DgraphQueryBuilder()
      .addTypeFilterDirective(DgraphEntityType.Page)
      .setUidFunc(pageId)
      .addBaseFields()
      .addExpandAll((f) => f.addExpandAllRecursive(2))
  }
}
