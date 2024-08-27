import type {
  IAppDto,
  IComponentDto,
  IPageDto,
  IRef,
} from '@codelab/shared/abstract/core'
import type {
  AtomBuilderFragment,
  AuthGuardFragment,
  ComponentBuilderFragment,
  ElementFragment,
  FieldFragment,
  PropFragment,
  RedirectFragment,
  ResourceFragment,
  StoreFragment,
  TypeFragment,
} from '@codelab/shared/infra/gql'

export interface IHydrateable<Dto, Model> {
  hydrate(dto: Dto): Model
}

export interface IHydrateableData {
  actionsDto?: StoreFragment['actions']
  appsDto?: Array<IAppDto>
  atomsDto?: Array<AtomBuilderFragment>
  authGuardsDto?: Array<AuthGuardFragment>
  componentsDto?: Array<ComponentBuilderFragment | IComponentDto>
  elementsDto?: Array<
    ElementFragment & { closestContainerNode: { id: string } }
  >
  fieldsDto?: Array<FieldFragment>
  // pages?: Array<PageDevelopmentFragment>
  pagesDto?: Array<IPageDto>
  propsDto?: Array<PropFragment>
  redirectsDto?: Array<RedirectFragment>
  resourcesDto?: Array<ResourceFragment>
  storesDto?: Array<StoreFragment & { component?: IRef; page?: IRef }>
  typesDto?: Array<TypeFragment>
}
