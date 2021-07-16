import {
  DgraphApp,
  DgraphElement,
  DgraphEntityType,
  DgraphPage,
  DgraphRepository,
  DgraphUseCase,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js'
import { AppValidator } from '../../app.validator'
import { DeleteAppRequest } from './delete-app.request'

@Injectable()
export class DeleteAppService extends DgraphUseCase<DeleteAppRequest> {
  constructor(dgraph: DgraphRepository, private appValidator: AppValidator) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: DeleteAppRequest,
    txn: Txn,
  ): Promise<void> {
    const {
      input: { appId },
    } = request

    await this.validate(request)

    await this.dgraph.executeUpsertDeleteAll(txn, (q) =>
      q
        .addJsonFields<DgraphApp & DgraphPage & DgraphElement>({
          pages: true,
          root: true,
          children: true,
          props: true,
        })
        .addTypeFilterDirective(DgraphEntityType.App)
        .setUidFunc(appId),
    )
  }

  protected async validate({
    input: { appId },
    currentUser,
  }: DeleteAppRequest) {
    await this.appValidator.existsAndIsOwnedBy(appId, currentUser)
  }
}
