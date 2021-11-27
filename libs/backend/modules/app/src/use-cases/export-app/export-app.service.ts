import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphEntityType, DgraphRepository } from '@codelab/backend/infra'
import { GetElementGraphService } from '@codelab/backend/modules/element'
import {
  ExportAppSchema,
  IExportApp,
  IPage,
} from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { AppValidator } from '../../domain/app.validator'
import { GetAppService } from '../get-app'
import { ExportAppRequest } from './export-app.request'

@Injectable()
export class ExportAppService extends DgraphUseCase<
  ExportAppRequest,
  IExportApp
> {
  constructor(
    dgraph: DgraphRepository,
    protected appValidator: AppValidator,
    protected getAppService: GetAppService,
    private getElementGraphService: GetElementGraphService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    req: ExportAppRequest,
  ): Promise<IExportApp> {
    await this.validate(req)

    const {
      input: { appId },
      currentUser,
    } = req

    const app = await this.getAppForExport(appId)

    if (!app.pages) {
      app.pages = []
    }

    const pages: Array<IPage> = await Promise.all(
      app.pages.map(async (page: any) => ({
        name: page.name,
        rootElementId: page.root.id,
        elements: await this.getElementGraphService.execute({
          currentUser,
          input: { where: { id: page.root.id } },
        }),
      })),
    )

    return ExportAppSchema.parse({ name: app.name, pages })
  }

  protected getAppForExport(appId: string) {
    return this.dgraph.transactionWrapper<any>((txn) =>
      this.dgraph.getOneOrThrowNamed(
        txn,
        `{
                  q(func: uid(${appId})) @filter(type(${DgraphEntityType.App})) @recurse {
                    id: uid
                    expand(App, Page)
                  }
               }`,
        'q',
      ),
    )
  }

  protected validate(request: ExportAppRequest) {
    return this.appValidator.existsAndIsOwnedBy(
      request.input.appId,
      request.currentUser,
    )
  }
}
