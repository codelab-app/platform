import { AppOGM, PageOGM, pageSelectionSet } from '@codelab/backend'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IAppExport } from '@codelab/shared/abstract/core'
import { cLog } from '@codelab/shared/utils'
import { omit } from 'lodash'
import { v4 } from 'uuid'
import { validate } from '../commands/import/validate'
import type { ExportAppData } from '../use-cases/export/export-app'
import { getElementAndDescendants } from '../use-cases/export/get-element'
import { getPageData } from '../use-cases/export/get-page'
import { createComponent } from './component.repo'
import { importElementInitial, updateImportedElement } from './element.repo'

export const createApp = async (app: IAppExport, selectedUser: string) => {
  cLog(omit(app, ['pages']))

  const App = await AppOGM()
  const { pages, providerElements } = app
  await validate(pages)

  for (const { elements, components } of pages) {
    for (const element of elements) {
      await importElementInitial(element, selectedUser)
    }

    // components should be created after their root elements
    for (const component of components) {
      await createComponent(component, selectedUser)
    }

    for (const element of elements) {
      await updateImportedElement(element)
    }
  }

  for (const element of providerElements) {
    const newElement = await importElementInitial(element, selectedUser)
  }

  for (const element of providerElements) {
    await updateImportedElement(element)
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
        name: app.name,
        owner: { connect: { where: { node: { id: selectedUser } } } },
        rootProviderElement: {
          connect: {
            where: { node: { id: app.rootProviderElement.id } },
          },
        },
        pages: {
          create: app.pages.map((page) => ({
            node: {
              id: page.id ?? v4(),
              name: page.name,
              rootElement: {
                connect: {
                  where: { node: { id: page.rootElement.id } },
                },
              },
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
  const Page = await PageOGM()

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
        rootElement: {
          id: page.rootElement.id,
          name: page?.rootElement?.name ?? null,
        },
        elements,
        components,
      }
    }),
  )

  const providerElements = await getElementAndDescendants(
    app.rootProviderElement.id,
  )

  return { app: { ...app, pages: pagesData, providerElements } }
}
