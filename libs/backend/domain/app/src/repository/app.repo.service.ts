import type { IAppDto } from '@codelab/shared/abstract/core'

import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { AppFragment, AppOptions, AppWhere } from '@codelab/shared/infra/gql'
import { appApi, appMapper } from '@codelab/shared-domain-module-app'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppRepository extends AbstractRepository<
  IAppDto,
  AppFragment,
  AppWhere,
  AppOptions
> {
  constructor(
    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
  ) {
    super(validationService, loggerService)
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _addMany(apps: Array<IAppDto>) {
    const {
      createApps: { apps: createdApps },
    } = await appApi.CreateApps({
      input: apps.map((app) => appMapper.toCreateInput(app)),
    })

    console.log('createdApps', createdApps)

    return createdApps
  }

  protected async _find({
    options,
    where,
  }: {
    where?: AppWhere
    options?: AppOptions
  }) {
    const { items } = await appApi.AppList({
      options,
      where,
    })

    return items
  }

  protected async _update(app: IAppDto, where: AppWhere) {
    const {
      updateApps: { apps },
    } = await appApi.UpdateApps({
      update: appMapper.toUpdateInput(app),
      where,
    })

    return apps[0]
  }
}

/**
 * Gather all pages, elements and components
 */
// export const getAppComponents = async (
//   app: App,
// ): Promise<IExportComponents> => {
//   const pageRepository = new PageRepository()
//   const pages = await pageRepository.find({ app: { id: app.id } })

//   const componentPromises = map(pages, async (page) => {
//     const { components } = await getPageData(page)

//     return components
//   })

//   const components = await Promise.all(componentPromises).then((result) =>
//     flatMap(result),
//   )

//   return { components }
// }
