import type {
  IAppProductionArgs,
  IAppProductionService,
} from '@codelab/frontend/abstract/domain'
import {
  getAppService,
  getComponentService,
  getElementService,
  IAppProductionDto,
} from '@codelab/frontend/abstract/domain'
import { getAtomService } from '@codelab/frontend/domain/atom'
import { getPageService } from '@codelab/frontend/domain/page'
import { getPropService } from '@codelab/frontend/domain/prop'
import {
  getActionService,
  getStoreService,
} from '@codelab/frontend/domain/store'
import { client } from '@codelab/frontend/infra/graphql'
import type { AtomProductionFragment } from '@codelab/shared/abstract/codegen'
import uniqBy from 'lodash/uniqBy'
import { computed } from 'mobx'
import { Model, model, modelAction } from 'mobx-keystone'
import { v4 } from 'uuid'
import { getSdk } from './app-production.endpoints.graphql.gen'

const appApi = getSdk(client)

const getAppProductionData = async ({
  domain,
  pageUrl,
}: IAppProductionArgs): Promise<IAppProductionDto> => {
  const data = await appApi.GetAppProduction({
    domain,
    pageUrl,
  })

  const app = data.apps[0]

  if (!app) {
    throw new Error('Missing app')
  }

  const pages = app.pages
  // provider page is also loaded therefore we need to find the current one
  const loadedPage = pages.find((page) => page.url === pageUrl)

  if (!loadedPage) {
    throw new Error('Missing page')
  }

  const elements = pages.flatMap((page) =>
    [page.rootElement, ...page.rootElement.descendantElements].map(
      (element) => ({
        ...element,
        closestContainerNode: { id: page.id },
        page: { id: page.id },
      }),
    ),
  )

  const props = elements.flatMap((element) => element.props)
  const stores = pages.flatMap((page) => page.store)
  const actions = stores.flatMap((store) => store.actions)

  const atoms = uniqBy(
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

@model('@codelab/AppProductionService')
export class AppProductionService
  extends Model({})
  implements IAppProductionService
{
  // made static to access in getStaticProps
  static getAppProductionData = getAppProductionData

  @modelAction
  hydrateAppProductionData(data: IAppProductionDto) {
    const entity = { id: v4() }

    // use a dummy api to avoid typing issues
    data.atoms.forEach((atom) => this.atomService.add({ ...atom, api: entity }))

    data.components.forEach((component) =>
      // use a dummy api to avoid typing issues
      this.componentService.add({ ...component, api: entity }),
    )

    data.elements.forEach((element) =>
      // use a dummy closestContainerNode to avoid typing issues
      this.elementService.add({
        ...element,
        closestContainerNode: entity,
      }),
    )

    data.props.forEach((prop) => this.propService.add(prop))

    data.pages.forEach((page) => this.pageService.add(page))

    data.stores.forEach((store) => this.storeService.add(store))

    data.actions.forEach((action) => this.actionService.add(action))

    return this.appService.add(data.app)
  }

  @computed
  private get actionService() {
    return getActionService(this)
  }

  @computed
  private get appService() {
    return getAppService(this)
  }

  @computed
  private get atomService() {
    return getAtomService(this)
  }

  @computed
  private get componentService() {
    return getComponentService(this)
  }

  @computed
  private get elementService() {
    return getElementService(this)
  }

  @computed
  private get pageService() {
    return getPageService(this)
  }

  @computed
  private get propService() {
    return getPropService(this)
  }

  @computed
  private get storeService() {
    return getStoreService(this)
  }
}
