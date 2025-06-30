import type { IAppProductionDto } from '@codelab/frontend-abstract-domain'
import type { AtomProductionFragment } from '@codelab/shared-infra-gqlgen'

import { appServerActions } from '@codelab/shared-domain-module-app'
import { uniqueBy } from 'remeda'

const { GetApp } = appServerActions

export interface IAppPreviewArgs {
  appId: string
  pageUrlPattern: string
}

export const appPreviewRepository = async ({
  appId,
  pageUrlPattern,
}: IAppPreviewArgs): Promise<IAppProductionDto> => {
  const data = await GetApp({
    where: { id: appId },
  })

  const app = data.apps[0]

  if (!app) {
    throw new Error('App not found')
  }

  const pages = app.pages

  // Find the page by URL pattern
  const loadedPage = pages.find((page) => {
    // Handle root page
    if (
      pageUrlPattern === '/' &&
      (page.urlPattern === '/' || page.urlPattern === '')
    ) {
      return true
    }

    return page.urlPattern === pageUrlPattern
  })

  if (!loadedPage) {
    throw new Error('Page not found')
  }

  const elements = pages.flatMap((page) =>
    page.elements.map((element) => ({
      ...element,
      closestContainerNode: { id: page.id },
      page: { id: page.id },
    })),
  )

  const props = elements.flatMap((element) => element.props)
  const stores = pages.flatMap((page) => page.store)
  const actions = stores.flatMap((store) => store.actions)

  const atoms = uniqueBy(
    [
      // Load all the atoms used by elements
      ...elements
        .flatMap((element) => element.renderType)
        .filter(
          (item): item is AtomProductionFragment => item.__typename === 'Atom',
        ),
      // Also load the default atoms
      ...data.atoms,
    ],
    // Filter by id in case duplicates exist
    (atom) => atom.id,
  )

  return {
    actions,
    app,
    appName: app.name,
    atoms,
    components: [],
    elements,
    fields: [],
    pageName: loadedPage.name,
    pages,
    props,
    stores,
  }
}
