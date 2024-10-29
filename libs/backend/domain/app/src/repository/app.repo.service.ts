import type {
  App,
  AppOptions,
  AppWhere,
} from '@codelab/backend/abstract/codegen'
import type { IAppDto } from '@codelab/shared/abstract/core'

import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  appSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import {
  appMapper,
  AppProperties,
  connectNodeIds,
  connectOwner,
  reconnectNodeIds,
} from '@codelab/shared/domain-old'
import { slugify } from '@codelab/shared/utils'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppRepository extends AbstractRepository<
  IAppDto,
  App,
  AppWhere,
  AppOptions
> {
  constructor(
    private ogmService: OgmService,
    protected override validationService: ValidationService,
    protected override loggerService: CodelabLoggerService,
  ) {
    super(validationService, loggerService)
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _addMany(apps: Array<IAppDto>) {
    return await (
      await (
        await this.ogmService.App
      ).create({
        input: apps.map((app) => appMapper.toCreateInput(app)),
      })
    ).apps
  }

  protected async _find({
    options,
    where,
  }: {
    where?: AppWhere
    options?: AppOptions
  }) {
    return await (
      await this.ogmService.App
    ).find({
      options,
      selectionSet: `{ ${appSelectionSet} }`,
      where,
    })
  }

  protected async _update(app: IAppDto, where: AppWhere) {
    return await (
      await (
        await this.ogmService.App
      ).update({
        update: appMapper.toUpdateInput(app),
        where,
      })
    ).apps[0]
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
