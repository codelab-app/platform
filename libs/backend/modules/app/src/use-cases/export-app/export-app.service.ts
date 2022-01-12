import { UseCasePort } from '@codelab/backend/abstract/core'
import { DgraphEntityType } from '@codelab/backend/infra'
import { GetElementGraphService } from '@codelab/backend/modules/element'
import {
  ExportAppSchema,
  IExportApp,
  IPage,
} from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { AppValidator } from '../../domain/app.validator'
import { GetAppService } from '../get-app'
import { ExportAppRequest } from './export-app.request'

@Injectable()
export class ExportAppService
  implements UseCasePort<ExportAppRequest, IExportApp>
{
  constructor(
    protected appValidator: AppValidator,
    protected getAppService: GetAppService,
    private getElementGraphService: GetElementGraphService,
  ) {}

  async execute(req: ExportAppRequest): Promise<IExportApp> {
    await this.validate(req)

    const {
      input: { appId },
      currentUser,
    } = req

    const app = await this.getAppForExport(appId, req.transaction)

    if (!app.pages) {
      app.pages = []
    }

    const pages: Array<IPage> = await Promise.all(
      app.pages.map(async (page: any) => ({
        id: page.id,
        name: page.name,
        rootElementId: page.root.id,
        elements: await this.getElementGraphService.execute({
          currentUser,
          input: { where: { id: page.root.id } },
          transaction: req.transaction,
        }),
      })),
    )

    return ExportAppSchema.parse({ id: app.id, name: app.name, pages })
  }

  protected async getAppForExport(appId: string, txn: Txn) {
    const query = `{
                  q(func: uid(${appId})) @filter(type(${DgraphEntityType.App})) @recurse {
                    id: uid
                    expand(App, Page)
                  }
               }`

    const data = ((await txn.query(query)).data as any)['q'][0]

    if (!data) {
      new Error('Not found')
    }

    return data
  }

  protected validate(request: ExportAppRequest) {
    return this.appValidator.existsAndIsOwnedBy(
      request.input.appId,
      request.currentUser,
    )
  }
}
