import type {
  IAtom,
  IComponent,
  IElement,
  IElementTree,
  IInterfaceType,
  IPrimitiveType,
  IReactNodeType,
  IRenderer,
  IRenderPropsType,
  IRootStore,
  IStore,
} from '@codelab/frontend/abstract/core'

export type ITestRootStore = {
  /**
   * We only use a single renderer for testing
   */
  renderer: IRenderer
  pageElementTree: IElementTree
} & Pick<IRootStore, 'atomService' | 'elementService' | 'componentService'>

export interface TestServices {
  rootStore: ITestRootStore
  renderer: IRenderer
  componentToRender: IComponent
  componentRootElement: IElement
  elementToRender: IElement
  elementToRender02: IElement
  componentInstanceElementToRender: IElement
  renderPropsType: IRenderPropsType
  reactNodeType: IReactNodeType
  primitiveType: IPrimitiveType
  emptyInterface: IInterfaceType
  divAtom: IAtom
  textAtom: IAtom
  store: IStore
}
