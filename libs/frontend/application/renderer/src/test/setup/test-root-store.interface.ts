import type {
  IComponentModel,
  IElementModel,
  IFieldModel,
  IReactNodeTypeModel,
  IRenderer,
  IRenderPropTypeModel,
} from '@codelab/frontend/abstract/domain'
import type { IRootStore } from '@codelab/frontend/application/shared/store'

export type ITestRootStore = Pick<
  IRootStore,
  | 'atomService'
  // | 'builderService'
  | 'componentService'
  | 'elementService'
  | 'pageService'
  | 'propService'
  | 'renderService'
  | 'storeService'
  | 'typeService'
  | 'userService'
>

export interface TestServices {
  component: IComponentModel
  componentField: IFieldModel
  componentInstance: IElementModel
  element: IElementModel
  reactNodeType: IReactNodeTypeModel
  renderPropType: IRenderPropTypeModel
  renderer: IRenderer
  rootStore: ITestRootStore
  textField: IFieldModel
}
