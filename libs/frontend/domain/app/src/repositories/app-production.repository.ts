import type {
  IAppProductionArgs,
  IAppProductionDto,
} from '@codelab/frontend/abstract/domain'
import type { AtomProductionFragment } from '@codelab/shared/infra/gql'

import { appServerActions } from '@codelab/shared-domain-module-app'
import { uniqueBy } from 'remeda'

//  In production we have domain and pageUrlPattern we filter app by domain and page by url

const { GetAppProduction } = appServerActions

export const appProductionRepository = async ({
  domainSlug,
  pageUrlPattern,
}: IAppProductionArgs): Promise<IAppProductionDto> => {
  const data = await GetAppProduction({
    domain: domainSlug,
    pageUrlPattern,
  })

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
}
