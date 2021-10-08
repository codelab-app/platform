import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphEntityType, DgraphRepository } from '@codelab/backend/infra'
import { AppSchema, IApp } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { AppValidator } from '../../domain/app.validator'
import { AppByIdFilter, AppByPageFilter } from './get-app.input'
import { GetAppRequest } from './get-app.request'

@Injectable()
export class GetAppService extends DgraphUseCase<GetAppRequest, IApp | null> {
  constructor(dgraph: DgraphRepository, private appValidator: AppValidator) {
    super(dgraph)
  }

  protected schema = AppSchema.nullable()

  protected async executeTransaction(request: GetAppRequest, txn: Txn) {
    const {
      input: { byId, byPage },
    } = request

    GetAppService.validate(request)

    let app: IApp | null

    if (byId) {
      app = await this.getAppById(txn, byId)
    } else if (byPage) {
      app = await this.getAppByPage(txn, byPage)
    } else {
      throw new Error('Invalid request')
    }

    if (app) {
      await this.appValidator.isOwnedBy(app, request.currentUser)
    }

    return app
  }

  private async getAppByPage(txn: Txn, byPage: AppByPageFilter) {
    return await this.dgraph.getOneNamed<IApp>(
      txn,
      this.createByPageQuery(byPage),
      'query',
    )
  }

  private async getAppById(txn: Txn, byId: AppByIdFilter) {
    return await this.dgraph.getOneNamed<IApp>(
      txn,
      this.createByIdQuery(byId),
      'query',
    )
  }

  protected createByIdQuery({ appId }: AppByIdFilter) {
    return `{
        query(func: type(${DgraphEntityType.App})) @normalize @filter(uid(${appId})) {
          id: uid
          owner {
             ownerId: uid
          }
          name: name
        }
    }`
  }

  protected createByPageQuery({ pageId }: AppByPageFilter) {
    return `{
      query(func: type(${DgraphEntityType.App})) @filter(uid(${pageId})) @normalize  {
         ~pages {
            id: uid
            owner {
               ownerId: uid
            }
            name: name
          }
      }
    }`
  }

  private static validate({ input: { byId, byPage } }: GetAppRequest) {
    if (!byId && !byPage) {
      throw new Error('Provide at least one filter to getApp')
    }

    if (byId && byPage) {
      throw new Error('Provide only one filter to getApp')
    }
  }
}
