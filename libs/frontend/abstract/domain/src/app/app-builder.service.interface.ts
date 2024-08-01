import type {
  AppDevelopmentFragment,
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
} from '@codelab/shared/abstract/codegen'
import type { IRef } from '@codelab/shared/abstract/core'

export interface IAppBuilderDto {
  actions: StoreFragment['actions']
  app: AppDevelopmentFragment
  atoms: Array<AtomDevelopmentFragment>
  authGuards: Array<AuthGuardFragment>
  components: Array<ComponentDevelopmentFragment>
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
  pageSlug: string
  userId: string
  appSlug: string
}) => Promise<IAppBuilderDto>
