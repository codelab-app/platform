import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphEntityType, DgraphRepository } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { AppValidator } from '../../domain/app.validator'
import { GetAppService } from '../get-app'
import { DeleteAppRequest } from './delete-app.request'

@Injectable()
export class DeleteAppService extends DgraphUseCase<DeleteAppRequest> {
  constructor(
    protected readonly dgraph: DgraphRepository,
    private appValidator: AppValidator,
    private getAppService: GetAppService,
  ) {
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
        .addFields('pages root children props')
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
