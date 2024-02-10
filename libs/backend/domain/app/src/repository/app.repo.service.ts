import type {
  App,
  AppOptions,
  AppWhere,
} from '@codelab/backend/abstract/codegen'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import {
  appSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import {
  AppProperties,
  connectNodeIds,
  connectOwner,
  reconnectNodeIds,
} from '@codelab/shared/domain/mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppRepository extends AbstractRepository<
  IAppDTO,
  App,
  AppWhere,
  AppOptions
> {
  constructor(
    private ogmService: OgmService,
    protected traceService: TraceService,
    protected validationService: ValidationService,
    private authService: AuthDomainService,
  ) {
    super(traceService, validationService)
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _addMany(apps: Array<IAppDTO>) {
    return (
      await (
        await this.ogmService.App
      ).create({
        input: apps.map(({ id, name, pages }) => ({
          compositeKey: AppProperties.appCompositeKey(
            name,
            this.authService.currentUser,
          ),
          id,
          owner: connectOwner(this.authService.currentUser),
          pages: connectNodeIds(pages?.map((page) => page.id)),
        })),
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

  protected async _update({ name, pages }: IAppDTO, where: AppWhere) {
    return (
      await (
        await this.ogmService.App
      ).update({
        update: {
          compositeKey: AppProperties.appCompositeKey(
            name,
            this.authService.currentUser,
          ),
          pages: reconnectNodeIds(pages?.map((page) => page.id)).map(
            (input) => ({
              ...input,
              // overriding disconnect from reconnectNodeIds because it disconnects everything
              // including the pages connected in previous items of the input array. This causes
              // the transaction to register only the last page being connected in the input array
              // TODO: Check it it's the case for other places using reconnectNodeIds and if so update it.
              disconnect: [
                {
                  where: {
                    NOT: {
                      node: {
                        id_IN: pages?.map((page) => page.id),
                      },
                    },
                  },
                },
              ],
            }),
          ),
        },
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
