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
import type { IAppModel } from './app.model.interface'

export interface IAppDevelopmentArgs {
  appName: string
  pageName: string
  userId: string
}

export interface IAppDevelopmentDto {
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

export interface IAppDevelopmentService {
  getAppDevelopmentData(data: IAppDevelopmentArgs): Promise<IAppDevelopmentDto>
  hydrateAppDevelopmentData(data: IAppDevelopmentDto): IAppModel
}
