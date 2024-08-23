import type {
  IDomainStore,
  IHydrateableData,
} from '@codelab/frontend/abstract/domain'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'

export const useHydrateStore = (hydrateableData: IHydrateableData) => {
  const domainStore = useDomainStore()

  const {
    actionsDto,
    appsDto,
    atomsDto,
    authGuardsDto,
    componentsDto,
    elementsDto,
    fieldsDto,
    pagesDto,
    redirectsDto,
    resourcesDto,
    storesDto,
    typesDto,
  } = hydrateableData

  const atoms = atomsDto?.map((atom) =>
    domainStore.atomDomainService.hydrate(atom),
  )

  const types = typesDto?.map((type) =>
    domainStore.typeDomainService.hydrate(type),
  )

  const fields = fieldsDto?.map((field) =>
    domainStore.fieldDomainService.hydrate(field),
  )

  const elements = elementsDto?.map((element) =>
    domainStore.elementDomainService.hydrate(element),
  )

  const components = componentsDto?.map((component) =>
    domainStore.componentDomainService.hydrate(component),
  )

  const stores = storesDto?.map((store) =>
    domainStore.storeDomainService.hydrate(store),
  )

  const actions = actionsDto?.map((action) =>
    domainStore.actionDomainService.hydrate(action),
  )

  const resources = resourcesDto?.map((resource) =>
    domainStore.resourceDomainService.hydrate(resource),
  )

  const authGuards = authGuardsDto?.map((authGuard) =>
    domainStore.authGuardDomainService.hydrate(authGuard),
  )

  const redirects = redirectsDto?.map((redirect) =>
    domainStore.redirectDomainService.hydrate(redirect),
  )

  const apps = appsDto?.map((app) => domainStore.appDomainService.hydrate(app))

  const pages = pagesDto?.map((page) =>
    domainStore.pageDomainService.hydrate(page),
  )

  const appPages = appsDto
    ?.flatMap((app) => app.pages ?? [])
    .map((page) => domainStore.pageDomainService.hydrate(page))

  const domains = appsDto
    ?.flatMap((app) => app.domains ?? [])
    .map((domain) => domainStore.domainDomainService.hydrate(domain))

  return {
    actions,
    apps,
    atoms,
    authGuards,
    components,
    domains,
    elements,
    fields,
    pages: [...(pages ?? []), ...(appPages ?? [])],
    redirects,
    resources,
    stores,
    types,
  }
}
