import type { ExportAppData, IAppExport } from '@codelab/backend/abstract/core'
import { AbstractRepository } from '@codelab/backend/abstract/types'
import { createComponent } from '@codelab/backend/domain/component'
import {
  importElementInitial,
  updateImportedElement,
} from '@codelab/backend/domain/element'
import { getPageData } from '@codelab/backend/domain/page'
import {
  appSelectionSet,
  pageSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { IAppDTO, IAuth0Owner } from '@codelab/frontend/abstract/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import {
  connectAuth0Owner,
  connectNodeId,
  connectNodeIds,
  reconnectNodeIds,
} from '@codelab/shared/domain/mapper'
import { cLog, createUniqueName } from '@codelab/shared/utils'
import omit from 'lodash/omit'
import { validate } from './validate'

export class AppRepository extends AbstractRepository<
  IAppDTO,
  OGM_TYPES.App,
  OGM_TYPES.AppWhere
> {
  private App = Repository.instance.App

  async find(where: OGM_TYPES.AppWhere = {}) {
    return await (
      await this.App
    ).find({
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
        await this.App
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

  protected async _update(
    { name, owner, pages }: IAppDTO,
    where: OGM_TYPES.AppWhere,
  ) {
    return (
      await (
        await this.App
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

export const createApp = async (app: IAppExport, owner: IAuth0Owner) => {
  cLog(omit(app, ['pages']))

  const App = await Repository.instance.App
  const { pages } = app
  await validate(pages)

  for (const { components, elements } of pages) {
    for (const element of elements) {
      await importElementInitial(element, owner)
    }

    // components should be created after their root elements
    for (const component of components) {
      await createComponent(component, owner)
    }

    for (const element of elements) {
      await updateImportedElement(element)
    }
  }

  const pagesData = app.pages.map(({ components, elements, ...props }) => ({
    ...props,
  }))

  cLog(pagesData)

  const existing = await App.find({
    where: {
      id: app.id,
    },
  })

  if (existing.length) {
    console.log('Deleting app/pages before re-creating...')
    await App.delete({
      delete: {
        pages: [{ where: {} }],
      },
      where: {
        id: app.id,
      },
    })
  }

  console.log('Creating new app...')

  const {
    apps: [importedApp],
  } = await App.create({
    input: [
      {
        _compoundName: createUniqueName(app.name, owner.auth0Id),
        id: app.id,
        owner: connectAuth0Owner(owner),
        pages: {
          create: app.pages.map((page) => ({
            node: {
              _compoundName: createUniqueName(page.name, app.id),
              id: page.id,
              kind: page.kind,
              pageContentContainer: page.pageContentContainer?.id
                ? connectNodeId(page.pageContentContainer.id)
                : undefined,
              rootElement: connectNodeId(page.rootElement.id),
              url: page.url,
            },
          })),
        },
      },
    ],
  })

  console.log('Creating actions...')

  // await importActions(app.store.actions, app.store.id)

  return importedApp
}

/**
 * Gather all pages, elements and components
 */
export const getApp = async (app: OGM_TYPES.App): Promise<ExportAppData> => {
  const Page = await Repository.instance.Page

  const pages = await Page.find({
    selectionSet: pageSelectionSet,
    where: { app: { id: app.id } },
  })

  const pagesData = await Promise.all(
    pages.map(async (page) => {
      const { components, elements } = await getPageData(page)
      const { id, kind, name, pageContentContainer, rootElement, url } = page

      return {
        components,
        elements,
        id: id,
        kind: kind,
        name: name,
        rootElement: {
          id: rootElement.id,
          name: rootElement.name,
        },
        url,
        ...(pageContentContainer ? { pageContentContainer } : {}),
      }
    }),
  )

  return {
    app: {
      ...app,
      pages: pagesData,
    },
  }
}
