import type {
  IAtom,
  IComponent,
  IElement,
  IElementTree,
  IInterfaceType,
  IPrimitiveType,
  IProp,
  IReactNodeType,
  IRenderer,
  IRenderPropsType,
  IRootStore,
  IStore,
} from '@codelab/frontend/abstract/core'

export type ITestRootStore = Pick<
  IRootStore,
  'atomService' | 'componentService' | 'elementService'
> & {
  pageElementTree: IElementTree
  /**
   * We only use a single renderer for testing
   */
  renderer: IRenderer
}

export interface TestServices {
  componentInstanceElementToRender: IElement
  componentInstanceElementToRenderProps: IProp
  componentRootElement: IElement
  componentRootElementProps: IProp
  componentToRender: IComponent
  divAtom: IAtom
  elementToRender: IElement
  elementToRender02: IElement
  elementToRender02Props: IProp
  elementToRenderProps: IProp
  emptyInterface: IInterfaceType
  primitiveType: IPrimitiveType
  reactNodeType: IReactNodeType
  renderPropsType: IRenderPropsType
  renderer: IRenderer
  rootStore: ITestRootStore
  store: IStore
  textAtom: IAtom
}
