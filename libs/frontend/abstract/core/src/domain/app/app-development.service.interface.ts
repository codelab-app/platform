import type {
  AppDevelopmentFragment,
  AtomDevelopmentFragment,
  AtomFragment,
  ComponentDevelopmentFragment,
  ElementFragment,
  FieldFragment,
  PageDevelopmentFragment,
  PropFragment,
  StoreFragment,
  TypeFragment,
} from '@codelab/shared/abstract/codegen'
import type { IAppModel } from './app.model.interface'

export interface IAppDevelopmentArgs {
  appName: string
  pageName: string
  userId: string
}

export interface IAppDevelopmentDto {
  app: AppDevelopmentFragment
  atoms: Array<AtomDevelopmentFragment>
  components: Array<ComponentDevelopmentFragment>
  elements: Array<ElementFragment & { closestContainerNode: { id: string } }>
  fields: Array<FieldFragment>
  pages: Array<PageDevelopmentFragment>
  props: Array<PropFragment>
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
