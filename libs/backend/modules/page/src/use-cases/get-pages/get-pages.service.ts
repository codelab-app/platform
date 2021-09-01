import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphApp,
  DgraphEntityType,
  DgraphPage,
  DgraphQueryBuilder,
  DgraphRepository,
} from '@codelab/backend/infra'
import { AppValidator } from '@codelab/backend/modules/app'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetPagesRequest } from './get-pages.request'

@Injectable()
export class GetPagesService extends DgraphUseCase<
  GetPagesRequest,
  Array<DgraphPage>
> {
  constructor(dgraph: DgraphRepository, private appValidator: AppValidator) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: GetPagesRequest,
    txn: Txn,
  ): Promise<Array<DgraphPage>> {
    const {
      input: {
        byApp: { appId },
      },
    } = request

    await this.validate(request)

    return this.dgraph
      .getOneOrThrow<DgraphApp>(txn, GetPagesService.createQuery(appId))
      .then((app) => app.pages || [])
  }

  protected async validate({
    input: {
      byApp: { appId },
    },
    currentUser,
  }: GetPagesRequest): Promise<void> {
    await this.appValidator.existsAndIsOwnedBy(appId, currentUser)
  }

  private static createQuery(appId: string) {
    return new DgraphQueryBuilder()
      .addTypeFilterDirective(DgraphEntityType.App)
      .setUidFunc(appId)
      .addBaseFields()
      .addExpandAll((f) => f.addExpandAllRecursive(2))
  }
}
