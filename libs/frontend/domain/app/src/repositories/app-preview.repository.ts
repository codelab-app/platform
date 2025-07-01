import type { IAppProductionDto } from '@codelab/frontend-abstract-domain'
import type { AtomProductionFragment } from '@codelab/shared-infra-gqlgen'

import { appServerActions } from '@codelab/shared-domain-module-app'
import { auth0Service } from '@codelab/shared-infra-auth0/server'
import { uniqueBy } from 'remeda'

// For preview we have appId from the subdomain and pageUrlPattern from the URL path
// We need to fetch the app by ID instead of domain

const { AppList } = appServerActions

export interface IAppPreviewArgs {
  appId: string
  pageUrlPattern: string
}

export const appPreviewRepository = async ({
  appId,
  pageUrlPattern,
}: IAppPreviewArgs): Promise<IAppProductionDto> => {
  console.log('Fetching app with ID:', appId)

  try {
    // Get M2M token for authentication
    const token = await auth0Service.getM2MToken()

    // Fetch app by ID with all necessary relations
    const data = await AppList(
      {
        where: { id: appId },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const app = data.items[0]

    if (!app) {
      throw new Error('App not found')
    }

    const pages = app.pages

    // Find the page by URL pattern, handling root page variations
    const loadedPage = pages.find((page) => {
      // Handle root page - both empty string and '/' should match
      if (
        pageUrlPattern === '/' &&
        (page.urlPattern === '/' || page.urlPattern === '')
      ) {
        return true
      }

      // For non-root pages, match the URL exactly
      return page.urlPattern === pageUrlPattern
    })

    if (!loadedPage) {
      throw new Error('Page not found')
    }

    // Transform elements to include required references
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

    // Extract atoms from elements, filtering for Atom type
    const atoms = uniqueBy(
      elements
        .flatMap((element) => element.renderType)
        .filter(
          (item): item is AtomProductionFragment => item.__typename === 'Atom',
        ),
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
  } catch (error) {
    console.error('Error in appPreviewRepository:', error)

    if (error instanceof Error && error.message.includes('fetch failed')) {
      throw new Error(
        'Network error: Unable to connect to API. Please check if the API server is running.',
      )
    }

    throw error
  }
}
