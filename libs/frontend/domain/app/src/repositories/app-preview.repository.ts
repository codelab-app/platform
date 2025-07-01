import type { IAppProductionDto } from '@codelab/frontend-abstract-domain'
import type { AtomProductionFragment } from '@codelab/shared-infra-gqlgen'

import { appServerActions } from '@codelab/shared-domain-module-app'
import { getM2MToken } from '@codelab/shared-infra-auth0/server'
import { uniqueBy } from 'remeda'

// For preview we have appId from the subdomain and pageUrlPattern from the URL path
// We need to fetch the app by ID instead of domain

const { GetAppPreview } = appServerActions

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
    const token = await getM2MToken()

    // Fetch app by ID with all necessary relations
    const data = await GetAppPreview(
      { appId, pageUrlPattern },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const app = data.apps[0]

    if (!app) {
      throw new Error('Missing app')
    }

    const pages = app.pages
    // provider page is also loaded therefore we need to find the current one
    const loadedPage = pages.find((page) => page.urlPattern === pageUrlPattern)

    if (!loadedPage) {
      throw new Error('Missing page')
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

    const atoms = uniqueBy(
      [
        // Load all the atoms used by elements
        ...elements
          .flatMap((element) => element.renderType)
          .filter(
            (item): item is AtomProductionFragment => item.__typename === 'Atom',
          ),
        // Also load the default atoms, here is just type `ReactFragment`
        ...data.atoms,
      ],
      // Filter by id in case `ReactFragment` already exists
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
