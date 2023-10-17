import type {
  AppDevelopmentFragment,
  AtomDevelopmentFragment,
  AtomFragment,
  AuthGuardFragment,
  ComponentDevelopmentFragment,
  ElementFragment,
  FieldFragment,
  PageDevelopmentFragment,
  PropFragment,
  StoreFragment,
  TypeFragment,
} from '@codelab/shared/abstract/codegen'
import type { ResourceFragment } from '../resource/resource.fragment.graphql.gen'
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
  resources: Array<ResourceFragment>
  stores: Array<StoreFragment>
  types: Array<TypeFragment>
}

export interface IAtomDevelopmentData {
  atom: AtomFragment
}

export interface IAppDevelopmentService {
  getAppDevelopmentData(data: IAppDevelopmentArgs): Promise<IAppDevelopmentDto>
  hydrateAppDevelopmentData(data: IAppDevelopmentDto): IAppModel
}
