import type { IEntity } from '@codelab/shared/abstract/types'
import type { RenderedComponentFragment } from '../component/component-render.fragment.graphql.gen'
import type { BuilderPageFragment } from '../page/page.fragment.graphql.gen'
import type { IOwnerSchema } from '../user'

export interface IAppDTO extends IOwnerSchema {
  domains?: Array<IEntity>
  id: string
  name: string
  pages?: Array<IEntity>
}

export type ICreateAppData = Pick<IAppDTO, 'id' | 'name' | 'owner'>

export type IUpdateAppData = Pick<IAppDTO, 'id' | 'name'>

/* *
 * Data required to initialize a page builder app
 */
export interface IPageBuilderAppProps {
  components?: Array<RenderedComponentFragment>
  pages: Array<BuilderPageFragment>
}
