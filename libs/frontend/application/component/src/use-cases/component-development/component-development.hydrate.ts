import type {
  IComponentDevelopmentDto,
  IDomainStore,
  IHydrateComponentDevelopment,
} from '@codelab/frontend/abstract/domain'

export const hydrateComponentDevelopment: IHydrateComponentDevelopment = (
  data: IComponentDevelopmentDto,
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

  data.stores.forEach((store) => domainStore.storeDomainService.hydrate(store))

  data.actions.forEach((action) =>
    domainStore.actionDomainService.hydrate(action),
  )

  data.resources.forEach((resource) =>
    domainStore.resourceDomainService.hydrate(resource),
  )

  return domainStore.componentDomainService.component(data.component.id)
}
