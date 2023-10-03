import type { IRootStore } from '@codelab/frontend/abstract/application'
import type {
  IComponentModel,
  IElementModel,
  IField,
  IReactNodeType,
  IRenderer,
  IRenderPropType,
} from '@codelab/frontend/abstract/domain'

export type ITestRootStore = Pick<
  IRootStore,
  | 'atomService'
  | 'componentService'
  | 'elementService'
  | 'pageService'
  | 'propService'
  | 'renderService'
  | 'storeService'
  | 'typeService'
> & {
  /**
   * We only use a single renderer for testing
   */
  renderer: IRenderer
  setRenderer(renderer: IRenderer): void
}

export interface TestServices {
  component: IComponentModel
  componentField: IField
  componentInstance: IElementModel
  element: IElementModel
  reactNodeType: IReactNodeType
  renderPropType: IRenderPropType
  renderer: IRenderer
  rootStore: ITestRootStore
  textField: IField
}
