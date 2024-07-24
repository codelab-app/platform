import type {
  AppFragment,
  AtomDevelopmentFragment,
  AuthGuardFragment,
  ComponentDevelopmentFragment,
  ElementFragment,
  FieldFragment,
  PageDevelopmentFragment,
  PropFragment,
  RedirectFragment,
  ResourceFragment,
  StoreFragment,
  TypeFragment,
} from '@codelab/frontend/infra/gql'
import type { IAppDto, IRef } from '@codelab/shared/abstract/core'

export interface IHydrateable<Dto, Model> {
  hydrate(dto: Dto): Model
}

export interface IHydrateableData {
  actions?: StoreFragment['actions']
  apps?: Array<IAppDto>
  atoms?: Array<AtomDevelopmentFragment>
  authGuards?: Array<AuthGuardFragment>
  components?: Array<ComponentDevelopmentFragment>
  elements?: Array<ElementFragment & { closestContainerNode: { id: string } }>
  fields?: Array<FieldFragment>
  // pages?: Array<PageDevelopmentFragment>
  props?: Array<PropFragment>
  redirects?: Array<RedirectFragment>
  resources?: Array<ResourceFragment>
  stores?: Array<StoreFragment & { component?: IRef; page?: IRef }>
  types?: Array<TypeFragment>
}
