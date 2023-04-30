import type {
  IComponent,
  IElement,
  IPage,
  IReactNodeType,
  IRenderer,
  IRenderPropType,
  IRootStore,
} from '@codelab/frontend/abstract/core'
import type { Field } from '@codelab/frontend/domain/type'
import type { Nullable } from '@codelab/shared/abstract/types'

export type ITestRootStore = Pick<
  IRootStore,
  | 'appService'
  | 'atomService'
  | 'componentService'
  | 'elementService'
  | 'pageService'
  | 'propService'
  | 'storeService'
> & {
  /**
   * We only use a single renderer for testing
   */
  renderer: Nullable<IRenderer>
  setRenderer(renderer: IRenderer): void
}

export interface TestServices {
  atomInstance: IElement
  component: IComponent
  componentInstance: IElement
  componentRootElement: IElement
  customTextField: Field
  page: IPage
  pageRootElement: IElement
  reactNodeType: IReactNodeType
  renderPropType: IRenderPropType
  renderer: IRenderer
  rootStore: ITestRootStore
}
