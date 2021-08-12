import {
  DgraphApp,
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphUseCase,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetAppsRequest } from './get-apps.request'

@Injectable()
export class GetAppsService extends DgraphUseCase<
  GetAppsRequest,
  Array<DgraphApp>
> {
  protected executeTransaction(
    request: GetAppsRequest,
    txn: Txn,
  ): Promise<Array<DgraphApp>> {
    return this.dgraph.getAll<DgraphApp>(txn, this.createQuery(request))
  }

  protected createQuery({ ownerId }: GetAppsRequest) {
    return new DgraphQueryBuilder()
      .setTypeFunc(DgraphEntityType.App)
      .addEqFilterDirective<DgraphApp>('ownerId', ownerId)
      .addBaseFields()
      .addExpandAll()
  }
}
