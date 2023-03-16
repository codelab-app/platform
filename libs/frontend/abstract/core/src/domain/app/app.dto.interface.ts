import type { IEntity } from '@codelab/shared/abstract/types'
import type { RenderedComponentFragment } from '../component/component-render.fragment.graphql.gen'
import type { IOwnerSchema } from '../user'
import type { PageBuilderAppFragment } from './app.fragment.graphql.gen'

export interface IAppDTO extends IOwnerSchema {
  domains?: Array<IEntity>
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
  components: Array<RenderedComponentFragment>
  pageId: string
}
