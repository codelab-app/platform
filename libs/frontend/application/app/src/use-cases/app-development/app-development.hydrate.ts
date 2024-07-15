import type {
  IAppDevelopmentDto,
  IDomainStore,
  IHydrateAppDevelopment,
} from '@codelab/frontend/abstract/domain'
import type { GetAppDevelopmentQuery } from '@codelab/frontend/infra/gql'
import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'

export const hydrateAppDevelopment: IHydrateAppDevelopment = (
  data: IAppDevelopmentDto,
  domainStore: IDomainStore,
) => {
  data.atoms.forEach((atom) => domainStore.atomDomainService.hydrate(atom))

  data.types.forEach((type) => domainStore.typeDomainService.hydrate(type))

  data.fields.forEach((field) => domainStore.fieldDomainService.hydrate(field))

  data.elements.forEach((element) =>
    domainStore.elementDomainService.hydrate(element),
  )

  data.components.forEach((component) =>
    domainStore.componentDomainService.hydrate(component),
  )

  data.pages.forEach((page) => domainStore.pageDomainService.hydrate(page))

  data.stores.forEach((store) => domainStore.storeDomainService.hydrate(store))

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
