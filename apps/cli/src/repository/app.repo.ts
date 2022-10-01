import {
  pageSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IAppExport } from '@codelab/shared/abstract/core'
import { connectNode } from '@codelab/shared/data'
import { cLog } from '@codelab/shared/utils'
import omit from 'lodash/omit'
import { v4 } from 'uuid'
import { validate } from '../commands/import/validate'
import type { ExportAppData } from '../use-cases/export/export-apps'
import { getPageData } from '../use-cases/export/get-page'
import { exportActions, importActions } from './action.repo'
import { createComponent } from './component.repo'
import { importElementInitial, updateImportedElement } from './element.repo'

export const createApp = async (app: IAppExport, userId: string) => {
  cLog(omit(app, ['pages']))

  const App = await Repository.instance.App
  const Store = await Repository.instance.Store
  const { pages } = app
  await validate(pages)

  for (const { elements, components } of pages) {
    for (const element of elements) {
      await importElementInitial(element, userId)
    }

    // components should be created after their root elements
    for (const component of components) {
      await createComponent(component, userId)
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

  console.log('Creating store...')

  const {
    stores: [appStore],
  } = await Store.create({
    input: [
      {
        id: app.store.id,
        name: app.store.name,
        api: connectNode(app.store.api.id),
      },
    ],
  })

  console.log('Creating actions...')

  await importActions(app.store.actions, appStore.id)

  console.log('Creating new app...')

  const {
    apps: [importedApp],
  } = await App.create({
    input: [
      {
        id: app.id,
        name: app.name,
        owner: connectNode(userId),
        slug: app.slug,
        store: connectNode(appStore.id),
        pages: {
          create: app.pages.map((page) => ({
            node: {
              id: page.id ?? v4(),
              name: page.name,
              slug: page.slug,
              rootElement: connectNode(page.rootElement.id),
            },
          })),
        },
      },
    ],
  })

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

      return {
        id: page.id,
        name: page.name,
        slug: page.slug,
        rootElement: {
          id: page.rootElement.id,
          name: page?.rootElement?.name ?? null,
        },
        elements,
        components,
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
