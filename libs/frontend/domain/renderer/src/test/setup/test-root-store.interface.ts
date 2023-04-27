import type {
  IComponent,
  IElement,
  IReactNodeType,
  IRenderer,
  IRenderPropType,
  IRootStore,
  IStore,
} from '@codelab/frontend/abstract/core'

export type ITestRootStore = Pick<
  IRootStore,
  | 'atomService'
  | 'builderRenderService'
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
  renderPropType: IRenderPropType
  renderer: IRenderer
  rootStore: ITestRootStore
  store: IStore
}
