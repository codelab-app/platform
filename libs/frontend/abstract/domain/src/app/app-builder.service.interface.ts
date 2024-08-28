import type { IRef } from '@codelab/shared/abstract/core'
import type {
  AppBuilderFragment,
  AtomBuilderFragment,
  AuthGuardFragment,
  ComponentBuilderFragment,
  ElementFragment,
  FieldFragment,
  PageDevelopmentFragment,
  PropFragment,
  RedirectFragment,
  ResourceFragment,
  StoreFragment,
  TypeFragment,
} from '@codelab/shared/infra/gql'

export interface IAppBuilderDto {
  actions: StoreFragment['actions']
  app: AppBuilderFragment
  atoms: Array<AtomBuilderFragment>
  authGuards: Array<AuthGuardFragment>
  components: Array<ComponentBuilderFragment>
  elements: Array<ElementFragment & { closestContainerNode: { id: string } }>
  fields: Array<FieldFragment>
  pages: Array<PageDevelopmentFragment>
  props: Array<PropFragment>
  redirects: Array<RedirectFragment>
  resources: Array<ResourceFragment>
  stores: Array<StoreFragment & { component?: IRef; page?: IRef }>
  types: Array<TypeFragment>
}

export type IAppBuilderQuery = (data: {
  appId: string
}) => Promise<IAppBuilderDto>
