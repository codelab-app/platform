import type { IRef } from '@codelab/shared-abstract-core'
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
  TagPreviewFragment,
  TypeFragment,
} from '@codelab/shared-infra-gqlgen'

export interface IPageBuilderDto {
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
  tags: Array<TagPreviewFragment>
  types: Array<TypeFragment>
}

export type IPageBuilderQuery = (data: {
  appId: string
  pageIds?: Array<string>
}) => Promise<IPageBuilderDto>
