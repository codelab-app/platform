import type {
  App,
  AppOptions,
  AppWhere,
} from '@codelab/backend/abstract/codegen'
import {
  appSelectionSet,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import {
  connectAuth0Owner,
  connectNodeIds,
  reconnectNodeIds,
} from '@codelab/shared/domain/mapper'
import { createUniqueName } from '@codelab/shared/utils'
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
  ) {
    super(traceService)
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
      selectionSet: appSelectionSet,
      where,
    })
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _add(apps: Array<IAppDTO>) {
    return (
      await (
        await this.ogmService.App
      ).create({
        input: apps.map(({ id, name, owner, pages }) => ({
          _compoundName: createUniqueName(name, owner.auth0Id),
          id,
          owner: connectAuth0Owner(owner),
          pages: connectNodeIds(pages?.map((page) => page.id)),
        })),
      })
    ).apps
  }

  protected async _update({ name, owner, pages }: IAppDTO, where: AppWhere) {
    return (
      await (
        await this.ogmService.App
      ).update({
        update: {
          _compoundName: createUniqueName(name, owner.auth0Id),
          pages: reconnectNodeIds(pages?.map((page) => page.id)).map(
            (input) => ({
              ...input,
              // overriding disconnect from reconnectNodeIds because it disconnects everythin
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
