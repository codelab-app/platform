import type {
  IAppDevelopmentArgs,
  IAppDevelopmentService,
} from '@codelab/frontend/abstract/core'
import {
  getAppService,
  getComponentService,
  getElementService,
  getUserService,
  IAppDevelopmentDto,
} from '@codelab/frontend/abstract/core'
import { getAtomService } from '@codelab/frontend/domain/atom'
import { getDomainService } from '@codelab/frontend/domain/domain'
import { getPageService } from '@codelab/frontend/domain/page'
import { getPropService } from '@codelab/frontend/domain/prop'
import { getResourceService } from '@codelab/frontend/domain/resource'
import { getStoreService } from '@codelab/frontend/domain/store'
import { getTypeService } from '@codelab/frontend/domain/type'
import { client } from '@codelab/frontend/presentation/client/graphql'
import type { AtomDevelopmentFragment } from '@codelab/shared/abstract/codegen'
import { AppProperties } from '@codelab/shared/domain/mapper'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
} from 'mobx-keystone'
import { getSdk } from './app-development.endpoints.graphql.gen'

const appApi = getSdk(client)

@model('@codelab/AppDevelopmentService')
export class AppDevelopmentService
  extends Model({})
  implements IAppDevelopmentService
{
  @modelFlow
  getAppDevelopmentData = _async(function* (
    this: AppDevelopmentService,
    { appName, pageName, userId }: IAppDevelopmentArgs,
  ) {
    const appCompositeKey = AppProperties.appCompositeKey(appName, {
      id: userId,
    })

    const data = yield* _await(
      appApi.GetAppDevelopment({
        appCompositeKey,
        pageName,
      }),
    )

    const app = data.apps[0]

    if (!app) {
      throw new Error('Missing app')
    }

    const pages = app.pages

    const elements = pages.flatMap((page) =>
      [page.rootElement, ...page.rootElement.descendantElements].map(
        (element) => ({ ...element, closestContainerNode: { id: page.id } }),
      ),
    )

    const props = elements.flatMap((element) => element.props)
    const stores = pages.flatMap((page) => page.store)

    const atoms = elements
      .flatMap((element) => element.renderType)
      .filter(
        (item): item is AtomDevelopmentFragment => item.__typename === 'Atom',
      )

    const types = atoms.flatMap((type) => type.api)

    return {
      app,
      atoms,
      components: [],
      elements,
      fields: [],
      pages,
      props,
      stores,
      types,
    }
  })

  @modelAction
  hydrateAppDevelopmentData(data: IAppDevelopmentDto) {
    data.atoms.forEach((atom) => this.atomService.add(atom))

    data.types.forEach((type) => this.typeService.add(type))

    data.components.forEach((component) => this.componentService.add(component))

    data.elements.forEach((element) => this.elementService.add(element))

    data.props.forEach((prop) => this.propService.add(prop))

    data.pages.forEach((page) => this.pageService.add(page))

    data.types.forEach((type) => this.typeService.add(type))

    data.stores.forEach((store) => this.storeService.add(store))

    return this.appService.add(data.app)
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
  private get domainService() {
    return getDomainService(this)
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
  private get resourceService() {
    return getResourceService(this)
  }

  @computed
  private get storeService() {
    return getStoreService(this)
  }

  @computed
  private get typeService() {
    return getTypeService(this)
  }

  @computed
  private get userService() {
    return getUserService(this)
  }
}