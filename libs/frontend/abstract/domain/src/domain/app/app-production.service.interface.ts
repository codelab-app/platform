import type {
  AppProductionFragment,
  ComponentProductionFragment,
  ElementProductionFragment,
  FieldFragment,
  PageProductionFragment,
  PropFragment,
  StoreFragment,
} from '@codelab/shared/abstract/codegen'
import type { AtomProductionFragment } from '../atom/atom.fragment.graphql.gen'
import type { IAppModel } from './app.model.interface'

export interface IAppProductionArgs {
  domain: string
  pageUrl: string
}

/**
 * For production user websites we use slightly different flow:
 * - we prebuild pages with all required information to avoid requests to platform DB
 * - pageName and appName are not exposed in url, so we need to pass them explicitly
 */
export interface IAppProductionDto {
  actions: StoreFragment['actions']
  app: AppProductionFragment
  appName: string
  atoms: Array<AtomProductionFragment>
  components: Array<ComponentProductionFragment>
  elements: Array<ElementProductionFragment>
  fields: Array<FieldFragment>
  pageName: string
  pages: Array<PageProductionFragment>
  props: Array<PropFragment>
  stores: Array<StoreFragment>
}

export interface IAppProductionService {
  hydrateAppProductionData(data: IAppProductionDto): IAppModel
}
