import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphEntityType,
  DgraphPage,
  DgraphQueryBuilder,
  DgraphRepository,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { PageValidator } from '../../domain/page.validator'
import { GetPageRequest } from './get-page.request'

@Injectable()
export class GetPageService extends DgraphUseCase<
  GetPageRequest,
  DgraphPage | null
> {
  constructor(dgraph: DgraphRepository, private pageValidator: PageValidator) {
    super(dgraph)
  }

  protected async executeTransaction(request: GetPageRequest, txn: Txn) {
    const {
      input: { pageId },
    } = request

    // await this.validate(request)

    return this.dgraph.getOne<DgraphPage>(
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
