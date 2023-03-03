import type {
  IAtom,
  IComponent,
  IElement,
  IInterfaceType,
  IPrimitiveType,
  IProp,
  IReactNodeType,
  IRenderer,
  IRenderPropType,
  IRootStore,
  IStore,
} from '@codelab/frontend/abstract/core'

export type ITestRootStore = Pick<
  IRootStore,
  'atomService' | 'componentService' | 'elementService'
> & {
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
  componentToRenderProps: IProp
  divAtom: IAtom
  elementToRender: IElement
  elementToRender02: IElement
  elementToRender02Props: IProp
  elementToRenderProps: IProp
  emptyInterface: IInterfaceType
  primitiveType: IPrimitiveType
  reactNodeType: IReactNodeType
  renderPropType: IRenderPropType
  renderer: IRenderer
  rootStore: ITestRootStore
  store: IStore
  textAtom: IAtom
}
