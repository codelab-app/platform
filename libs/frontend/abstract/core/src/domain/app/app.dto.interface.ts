import type { IEntity } from '@codelab/shared/abstract/types'
import type { IPageDTO } from '../page'
import type { IStoreDTO } from '../store'
import type { IAuth0Owner } from '../user'
import type {
  AppPreviewFragment,
  PageBuilderAppFragment,
} from './app.fragment.graphql.gen'

export interface IAppDTO {
  id: string
  name: string
  owner: IAuth0Owner
  pages: Array<IEntity>
  store: IEntity
}

export type ICreateAppData = Pick<IAppDTO, 'id' | 'name' | 'owner'>

export type IUpdateAppData = Pick<IAppDTO, 'id' | 'name'>

/* *
 * Data required to initialize a page builder app
 */
export interface IPageBuilderAppProps {
  app: PageBuilderAppFragment
  pageId: string
}
