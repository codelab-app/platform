import {
  DgraphApp,
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphQueryField,
  DgraphRepository,
  DgraphUseCase,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { AppValidator } from '../../app.validator'
import { AppByIdFilter, AppByPageFilter } from './get-app.input'
import { GetAppRequest } from './get-app.request'

@Injectable()
export class GetAppService extends DgraphUseCase<GetAppRequest, DgraphApp> {
  constructor(dgraph: DgraphRepository, private appValidator: AppValidator) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: GetAppRequest,
    txn: Txn,
  ): Promise<DgraphApp> {
    const {
      input: { byId, byPage },
    } = request

    this.validate(request)

    let app: DgraphApp

    if (byId) {
      app = await this.getAppById(txn, byId)
    } else if (byPage) {
      app = await this.getAppByPage(txn, byPage)
    } else {
      throw new Error('Invalid request')
    }

    await this.appValidator.isOwnedBy(app, request.currentUser)

    return app
  }

  private async getAppByPage(txn: Txn, byPage: AppByPageFilter) {
    return await this.dgraph
      .getOneOrThrow<{ '~pages': [DgraphApp] }>(
        txn,
        this.createByPageQuery(byPage),
      )
      .then((r) => {
        if (!r['~pages'] || !r['~pages'].length) {
          throw new Error('Error while getting app for page')
        }

        return r['~pages'][0]
      })
  }

  private async getAppById(txn: Txn, byId: AppByIdFilter) {
    return await this.dgraph.getOneOrThrow<DgraphApp>(
      txn,
      this.createByIdQuery(byId),
    )
  }

  protected createByIdQuery({ appId }: AppByIdFilter) {
    return new DgraphQueryBuilder()
      .setUidFunc(appId)
      .addTypeFilterDirective(DgraphEntityType.App)
      .addBaseFields()
      .addExpandAll()
  }

  protected createByPageQuery({ pageId }: AppByPageFilter) {
    return new DgraphQueryBuilder()
      .setUidFunc(pageId)
      .addTypeFilterDirective(DgraphEntityType.App)
      .addBaseFields()
      .addFields(
        new DgraphQueryField('~pages').addExpandAll((f) =>
          f.addExpandAll((f2) => f2.addExpandAll()),
        ),
      )
  }

  private validate({ input: { byId, byPage } }: GetAppRequest) {
    if (!byId && !byPage) {
      throw new Error('Provide at least one filter to getApp')
    }

    if (byId && byPage) {
      throw new Error('Provide only one filter to getApp')
    }
  }
}
