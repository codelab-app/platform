import type { IAppDTO } from '@codelab/shared/abstract/core'
import type { RenderedComponentFragment } from '../component/component-render.fragment.graphql.gen'
import type { BuilderPageFragment } from '../page/page.fragment.graphql.gen'

export type ICreateAppData = Pick<IAppDTO, 'id' | 'name' | 'owner'>

export type IUpdateAppData = Pick<IAppDTO, 'id' | 'name'>

/* *
 * Data required to initialize a page builder app
 */
export interface IPageBuilderAppProps {
  components?: Array<RenderedComponentFragment>
  pages: Array<BuilderPageFragment>
}
