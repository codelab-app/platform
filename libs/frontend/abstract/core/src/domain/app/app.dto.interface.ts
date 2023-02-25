import type { IAuth0Owner } from '../user'
import type {
  AppPreviewFragment,
  PageBuilderAppFragment,
} from './app.fragment.graphql.gen'

export interface ICreateAppDTO {
  id: string
  name: string
  owner: IAuth0Owner
}

export type IUpdateAppDTO = Omit<ICreateAppDTO, 'owner'>

export type IAppDTO = AppPreviewFragment

/**
 * Data required to initialize a page builder app
 */
export interface IPageBuilderAppProps {
  app: PageBuilderAppFragment
  pageId: string
}
