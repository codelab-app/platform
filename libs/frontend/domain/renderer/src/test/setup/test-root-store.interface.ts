import type {
  IComponent,
  IElement,
  IField,
  IReactNodeType,
  IRenderer,
  IRenderPropType,
  IRootStore,
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
  component: IComponent
  componentField: IField
  componentInstance: IElement
  element: IElement
  reactNodeType: IReactNodeType
  renderPropType: IRenderPropType
  renderer: IRenderer
  rootStore: ITestRootStore
  textField: IField
}
