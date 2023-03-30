import type {
  IComponent,
  IElement,
  IReactNodeType,
  IRenderer,
  IRenderPropsType,
  IRootStore,
  IStore,
} from '@codelab/frontend/abstract/core'

export type ITestRootStore = Pick<
  IRootStore,
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
  renderer: IRenderer
  setRenderer(renderer: IRenderer): void
}

export interface TestServices {
  componentInstanceElementToRender: IElement
  componentToRender: IComponent
  elementToRender: IElement
  reactNodeType: IReactNodeType
  renderPropsType: IRenderPropsType
  renderer: IRenderer
  rootStore: ITestRootStore
  store: IStore
}
