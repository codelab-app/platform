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
} from '@codelab/frontend/infra/gql'
import type { IAppDto, IPageDto, IRef } from '@codelab/shared/abstract/core'

export interface IHydrateable<Dto, Model> {
  hydrate(dto: Dto): Model
}

export interface IHydrateableData {
  actions?: StoreFragment['actions']
  apps?: Array<IAppDto>
  atoms?: Array<AtomBuilderFragment>
  authGuards?: Array<AuthGuardFragment>
  components?: Array<ComponentBuilderFragment>
  elements?: Array<ElementFragment & { closestContainerNode: { id: string } }>
  fields?: Array<FieldFragment>
  // pages?: Array<PageDevelopmentFragment>
  pages?: Array<IPageDto>
  props?: Array<PropFragment>
  redirects?: Array<RedirectFragment>
  resources?: Array<ResourceFragment>
  stores?: Array<StoreFragment & { component?: IRef; page?: IRef }>
  types?: Array<TypeFragment>
}
