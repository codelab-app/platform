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

  for (const { elements, components } of pages) {
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

  const pagesData = app.pages.map(({ elements, components, ...props }) => ({
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
      where: {
        id: app.id,
      },
      delete: {
        pages: [{ where: {} }],
        store: { where: {} },
      },
    })
  }

  console.log('Creating new app...')

  const {
    apps: [importedApp],
  } = await App.create({
    input: [
      {
        id: app.id,
        _compoundName: createUniqueName(app.name, app),
        owner: connectAuth0Owner(owner),
        store: {
          create: {
            node: {
              id: app.store.id,
              name: app.store.name,
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
            },
          },
        },
        pages: {
          create: app.pages.map((page) => ({
            node: {
              id: page.id,
              _compoundName: createUniqueName(page.name, page),
              rootElement: connectNodeId(page.rootElement.id),
              kind: page.kind,
              pageContentContainer: page.pageContentContainer?.id
                ? connectNodeId(page.pageContentContainer.id)
                : undefined,
            },
          })),
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
    where: { app: { id: app.id } },
    selectionSet: pageSelectionSet,
  })

  const pagesData = await Promise.all(
    pages.map(async (page) => {
      const { elements, components } = await getPageData(page)
      const { id, name, kind, rootElement, pageContentContainer } = page

      return {
        id: id,
        name: name,
        kind: kind,
        rootElement: {
          id: rootElement.id,
          name: rootElement.name,
        },
        elements,
        components,
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
