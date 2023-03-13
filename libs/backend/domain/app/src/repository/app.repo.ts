import type { ExportAppData, IAppExport } from '@codelab/backend/abstract/core'
import { exportActions, importActions } from '@codelab/backend/domain/action'
import { createComponent } from '@codelab/backend/domain/component'
import {
  importElementInitial,
  updateImportedElement,
} from '@codelab/backend/domain/element'
import { getPageData } from '@codelab/backend/domain/page'
import {
  pageSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { IAuth0Owner } from '@codelab/frontend/abstract/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { connectAuth0Owner, connectNodeId } from '@codelab/shared/domain/mapper'
import { cLog, createUniqueName } from '@codelab/shared/utils'
import omit from 'lodash/omit'
import { validate } from './validate'

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
        store: { where: {} },
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
            },
          })),
        },
        store: {
          create: {
            node: {
              // api: connectNodeId(app.store.api.id),
              api: {
                create: {
                  node: {
                    id: app.store.api.id,
                    name: `${app.store.name} API`,
                    owner: connectAuth0Owner(owner),
                  },
                },
              },

              id: app.store.id,

              name: app.store.name,
            },
          },
        },
      },
    ],
  })

  console.log('Creating actions...')

  await importActions(app.store.actions, app.store.id)

  return importedApp
}

/**
 * Gather all pages, elements and components
 */
export const getApp = async (app: OGM_TYPES.App): Promise<ExportAppData> => {
  const Page = await Repository.instance.Page
  const actions = await exportActions(app.store.id)

  const pages = await Page.find({
    selectionSet: pageSelectionSet,
    where: { app: { id: app.id } },
  })

  const pagesData = await Promise.all(
    pages.map(async (page) => {
      const { components, elements } = await getPageData(page)
      const { id, kind, name, pageContentContainer, rootElement } = page

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
        ...(pageContentContainer ? { pageContentContainer } : {}),
      }
    }),
  )

  return {
    app: {
      ...app,
      pages: pagesData,
      store: { ...app.store, actions },
    },
  }
}
