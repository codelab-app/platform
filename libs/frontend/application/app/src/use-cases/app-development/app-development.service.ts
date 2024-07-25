import type {
  IAppDevelopmentArgs,
  IAppDevelopmentDto,
} from '@codelab/frontend/abstract/domain'
import { useDomainStore } from '@codelab/frontend/infra/mobx'
import { appDevelopmentApi } from '@codelab/frontend-domain-app/repositories'
import type { AtomDevelopmentFragment } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { AppProperties } from '@codelab/shared/domain'
import { slugify } from '@codelab/shared/utils'
import uniqBy from 'lodash/uniqBy'

export const useAppDevelopmentService = () => {
  const domainStore = useDomainStore()

  const getAppDevelopmentData = async ({
    appName,
    pageName,
    userId,
  }: IAppDevelopmentArgs) => {
    const appCompositeKey = AppProperties.appCompositeKey(
      { slug: slugify(appName) },
      {
        id: userId,
      },
    )

    const data = await appDevelopmentApi.GetAppDevelopment({
      appCompositeKey,
      pageName,
    })

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
      ...data.codeMirrorTypes,
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
  }

  const hydrateAppDevelopmentData = (data: IAppDevelopmentDto) => {
    data.atoms.forEach((atom) => domainStore.atomDomainService.hydrate(atom))

    data.types.forEach((type) => domainStore.typeDomainService.hydrate(type))

    data.fields.forEach((field) =>
      domainStore.fieldDomainService.hydrate(field),
    )

    data.elements.forEach((element) =>
      domainStore.elementDomainService.hydrate(element),
    )

    data.components.forEach((component) =>
      domainStore.componentDomainService.hydrate(component),
    )

    data.pages.forEach((page) => domainStore.pageDomainService.hydrate(page))

    data.stores.forEach((store) =>
      domainStore.storeDomainService.hydrate(store),
    )

    data.actions.forEach((action) =>
      domainStore.actionDomainService.hydrate(action),
    )

    data.resources.forEach((resource) =>
      domainStore.resourceDomainService.hydrate(resource),
    )

    data.authGuards.forEach((authGuard) =>
      domainStore.authGuardDomainService.hydrate(authGuard),
    )

    data.redirects.forEach((redirect) =>
      domainStore.redirectDomainService.hydrate(redirect),
    )

    domainStore.elementDomainService.logElementTreeState()

    return domainStore.appDomainService.hydrate(data.app)
  }

  return {
    getAppDevelopmentData,
    hydrateAppDevelopmentData,
  }
}
