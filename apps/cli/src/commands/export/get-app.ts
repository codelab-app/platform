import { IAppModel, PageOGM, pageSelectionSet } from '@codelab/backend'
import { getElementAndDescendants } from './get-element'
import { getPageData } from './get-page'

/**
 * Gather all pages, elements and components
 */
export const getAppData = async (app: IAppModel) => {
  const Page = await PageOGM()

  const pages = await Page.find({
    where: { app: { id: app.id } },
    selectionSet: pageSelectionSet,
  })

  const pagesData = await Promise.all(
    pages.map(async (page) => {
      const { elements, components } = await getPageData(page)

      return { page, elements, components }
    }),
  )

  const providerElements = await getElementAndDescendants(
    app.rootProviderElement.id,
  )

  return { app, pages: pagesData, providerElements }
}
