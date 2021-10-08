import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphEntityType } from '@codelab/backend/infra'
import { AppSchema, IApp } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetAppsRequest } from './get-apps.request'

@Injectable()
export class GetAppsService extends DgraphUseCase<GetAppsRequest, Array<IApp>> {
  protected schema = AppSchema.array()

  protected async executeTransaction(
    request: GetAppsRequest,
    txn: Txn,
  ): Promise<Array<IApp>> {
    const apps = await this.dgraph.getAllNamed<IApp>(
      txn,
      this.createQuery(request),
      'query',
    )

    return apps.map((app) => AppSchema.parse(app))
  }

  protected createQuery({ currentUser }: GetAppsRequest) {
    return `{
        query(func: type(${DgraphEntityType.App})) @filter(uid_in(owner, ${currentUser.id})) @normalize {
          id: uid
          name: name
          owner {
            ownerId: uid
          }
        }
    }`
  }
}
