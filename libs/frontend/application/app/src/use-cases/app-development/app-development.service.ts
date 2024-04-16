import type {
  IAppDevelopmentArgs,
  IAppDevelopmentService,
} from '@codelab/frontend/abstract/domain'
import {
  getActionDomainService,
  getAppDomainService,
  getAtomDomainService,
  getAuthGuardDomainService,
  getComponentDomainService,
  getElementDomainService,
  getFieldDomainService,
  getPageDomainService,
  getRedirectDomainService,
  getResourceDomainService,
  getStoreDomainService,
  IAppDevelopmentDto,
} from '@codelab/frontend/abstract/domain'
import { getTypeDomainService } from '@codelab/frontend/domain/type'
import type { AtomDevelopmentFragment } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { AppProperties } from '@codelab/shared/domain'
import uniqBy from 'lodash/uniqBy'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
} from 'mobx-keystone'
import { appDevelopmentApi } from './app-development.api'

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
      appDevelopmentApi.GetAppDevelopment({
        appCompositeKey,
        pageName,
      }),
    )

    const app = data.apps[0]

    if (!app) {
      throw new Error('Missing app')
    }

    const pages = app.pages
    const components = data.components

    const pagesElements = pages.flatMap((page) =>
      page.elements.map((element) => ({
        ...element,
        closestContainerNode: { id: page.id },
        page: { id: page.id },
      })),
    )

    const componentsElements = components.flatMap((component) =>
      component.elements.map((element) => ({
        ...element,
        closestContainerNode: { id: component.id },
        component: { id: component.id },
      })),
    )

    const elements = [...pagesElements, ...componentsElements]
    const resources = data.resources
    const authGuards = data.authGuards
    const redirects = data.redirects

    const props = elements
      .flatMap((element) => element.props)
      .concat(resources.map((resource) => resource.config))
      .concat(authGuards.map((authGuard) => authGuard.config))

    const pageStores = pages.map((page) => ({
      ...page.store,
      page: { id: page.id },
    }))

    const componentStores = components.map((component) => ({
      ...component.store,
      component: { id: component.id },
    }))

    const stores = [...pageStores, ...componentStores]
    const actions = stores.flatMap((store) => store.actions)

    const atoms = uniqBy(
      [
        // Load all the atoms used by elements
        ...elements
          .flatMap((element) => element.renderType)
          .filter(
            (item): item is AtomDevelopmentFragment =>
              item.__typename === 'Atom',
          ),
        // Also load the default atoms, here is just type `ReactFragment`
        ...data.atoms,
      ],
      // Filter by id in case `ReactFragment` already exists
      (atom) => atom.id,
    )

    const elementsDependantTypes = elements
      .map((element) => element.dependantTypes)
      .flat()

    const types = [
      ...atoms.flatMap((type) => type.api),
      ...stores.map((store) => store.api),
      ...components.map((component) => component.api),
      ...elementsDependantTypes.filter(
        (type) => type.kind === ITypeKind.InterfaceType,
      ),
    ]

    const systemTypes = [
      ...data.primitiveTypes,
      ...data.reactNodeTypes,
      ...data.richTextTypes,
      ...data.renderPropTypes,
      ...data.actionTypes,
    ]

    const fields = types.flatMap((type) =>
      'fields' in type ? type.fields : [],
    )

    return {
      actions,
      app,
      atoms,
      authGuards,
      components,
      elements,
      fields,
      pages,
      props,
      redirects,
      resources: data.resources,
      stores,
      types: [...types, ...elementsDependantTypes, ...systemTypes],
    }
  })

  @modelAction
  hydrateAppDevelopmentData(data: IAppDevelopmentDto) {
    data.atoms.forEach((atom) => this.atomDomainService.hydrate(atom))

    data.types.forEach((type) => this.typeDomainService.hydrate(type))

    data.fields.forEach((field) => this.fieldDomainService.hydrate(field))

    data.elements.forEach((element) =>
      this.elementDomainService.hydrate(element),
    )

    data.components.forEach((component) =>
      this.componentDomainService.hydrate(component),
    )

    data.pages.forEach((page) => this.pageDomainService.hydrate(page))

    data.stores.forEach((store) => this.storeDomainService.hydrate(store))

    data.actions.forEach((action) => this.actionDomainService.hydrate(action))

    data.resources.forEach((resource) =>
      this.resourceDomainService.hydrate(resource),
    )

    data.authGuards.forEach((authGuard) =>
      this.authGuardDomainService.hydrate(authGuard),
    )

    data.redirects.forEach((redirect) =>
      this.redirectDomainService.hydrate(redirect),
    )

    this.elementDomainService.logElementTreeState()

    return this.appDomainService.hydrate(data.app)
  }

  @computed
  private get actionDomainService() {
    return getActionDomainService(this)
  }

  @computed
  private get appDomainService() {
    return getAppDomainService(this)
  }

  @computed
  private get atomDomainService() {
    return getAtomDomainService(this)
  }

  @computed
  private get authGuardDomainService() {
    return getAuthGuardDomainService(this)
  }

  @computed
  private get componentDomainService() {
    return getComponentDomainService(this)
  }

  @computed
  private get elementDomainService() {
    return getElementDomainService(this)
  }

  @computed
  private get fieldDomainService() {
    return getFieldDomainService(this)
  }

  @computed
  private get pageDomainService() {
    return getPageDomainService(this)
  }

  @computed
  private get redirectDomainService() {
    return getRedirectDomainService(this)
  }

  @computed
  private get resourceDomainService() {
    return getResourceDomainService(this)
  }

  @computed
  private get storeDomainService() {
    return getStoreDomainService(this)
  }

  @computed
  private get typeDomainService() {
    return getTypeDomainService(this)
  }
}
