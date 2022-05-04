import { IAppModel, PageOGM, pageSelectionSet } from '@codelab/backend'
import { IAppExport } from '@codelab/shared/abstract/core'
import { getElementAndDescendants } from './get-element'
import { getPageData } from './get-page'

export type ExportAppData = {
  app: IAppExport
}

/**
 * Gather all pages, elements and components
 */
export const getAppData = async (app: IAppModel): Promise<ExportAppData> => {
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
