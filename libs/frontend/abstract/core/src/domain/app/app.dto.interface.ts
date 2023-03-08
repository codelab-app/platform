import type { IEntity } from '@codelab/shared/abstract/types'
import type { IOwnerSchema } from '../user'
import type { PageBuilderAppFragment } from './app.fragment.graphql.gen'

export interface IAppDTO extends IOwnerSchema {
  id: string
  name: string
  pages?: Array<IEntity>
  store: IEntity
}

export type ICreateAppData = Pick<IAppDTO, 'id' | 'name' | 'owner'>

export type IUpdateAppData = Pick<IAppDTO, 'id' | 'name'>

/* *
 * Data required to initialize a page builder app
 */
export interface IPageBuilderAppProps {
  appData: PageBuilderAppFragment
  pageId: string
}
