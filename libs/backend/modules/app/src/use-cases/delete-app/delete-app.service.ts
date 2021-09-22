import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphApp,
  DgraphElement,
  DgraphEntityType,
  DgraphPage,
  DgraphRepository,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { AppValidator } from '../../domain/app.validator'
import { GetAppService } from '../get-app'
import { DeleteAppRequest } from './delete-app.request'

@Injectable()
export class DeleteAppService extends DgraphUseCase<
  DeleteAppRequest,
  DgraphApp | null
> {
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
  ): Promise<DgraphApp | null> {
    const {
      input: { appId },
      currentUser,
    } = request

    await this.validate(request)

    const appToDelete = await this.getAppService.execute({
      input: { byId: { appId } },
      currentUser,
    })

    if (!appToDelete) {
      return null
    }

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

    return appToDelete
  }

  protected async validate({
    input: { appId },
    currentUser,
  }: DeleteAppRequest) {
    await this.appValidator.existsAndIsOwnedBy(appId, currentUser)
  }
}
