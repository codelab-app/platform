import type {
  ElementCreateInput,
  ElementUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IElementDTO } from '@codelab/shared/abstract/core'
import type {
  IEntity,
  Maybe,
  Nullable,
  Nullish,
} from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IElementTreeViewDataNode } from '../../ui'
import type { IAction } from '../action'
import type { BuilderWidthBreakPoint } from '../builder'
import type { IComponentModel } from '../component'
import type { IHook } from '../hook'
import type { IModel } from '../model.interface'
import type { IPageModel } from '../page'
import type { IProp, IPropData } from '../prop'
import type { IElementRuntimeProp, RendererType } from '../render'
import type { IStore } from '../store'
import type { IElementRenderType } from './render-type'

/**
 * This is a non-element type node that contains the root element.
 *
 * - App, Page, Component
 */
export interface IElementContainer {
  id: string
  rootElementId: string
}

export interface CssMap {
  [prop: string]: string
}

export interface RenderingError {
  message: string
  stack: Maybe<string>
}

// Metadata obtained from the renderer
// regarding the element's rendering
export interface RenderingMetadata {
  error: Nullish<RenderingError>
}

export interface IEvaluationContext {
  actions: IPropData
  args?: Array<unknown>
  componentProps: IPropData
  props: IPropData
  refs: IPropData
  rendererType?: RendererType
  rootActions: IPropData
  rootRefs: IPropData
  rootState: IPropData
  state: IPropData
  url: IPropData
}

export interface IBreakpointStyle {
  cssString?: string
  guiString?: string
}

export type IElementStyle = Record<
  BuilderWidthBreakPoint,
  IBreakpointStyle | undefined
>

export interface ElementCssRules {
  [key: string]: ElementCssRules | string
}

export interface IElementModel
  extends Omit<
      IModel<ElementCreateInput, ElementUpdateInput, void>,
      'toDeleteInput'
    >,
    ICacheService<IElementDTO, IElementModel> {
  ancestorError: Nullish<RenderingError>
  atomName: string
  childMapperComponent?: Nullable<Ref<IComponentModel>>
  childMapperPreviousSibling?: Nullable<Ref<IElementModel>>
  childMapperPropKey?: Nullable<string>
  children: Array<IElementModel>
  // the closest container node that element belongs to
  closestContainerNode: IComponentModel | IPageModel
  closestParent: IElementModel | null
  // the closest rootElement of node (page/component) that element belongs to
  closestRootElement: IElementModel
  customCss?: Nullable<string>
  // This is a computed property, so we can use model instead of ref
  descendantElements: Array<IElementModel>
  // used for expressions evaluation
  expressionEvaluationContext: IEvaluationContext
  firstChild?: Nullable<Ref<IElementModel>>
  guiCss?: Nullable<string>
  hooks: Array<IHook>
  id: string
  isRoot: boolean
  label: string
  name: string
  nextSibling?: Nullable<Ref<IElementModel>>
  owner: Nullable<IEntity>
  // page that this element belongs to
  page: Nullable<Ref<IPageModel>>
  // component that this element belongs to
  parentComponent?: Nullable<Ref<IComponentModel>>
  parentElement?: Nullable<Ref<IElementModel>>
  postRenderAction?: Nullable<Ref<IAction>>
  preRenderAction?: Nullable<Ref<IAction>>
  prevSibling?: Nullable<Ref<IElementModel>>
  props: Ref<IProp>
  // same as expressionEvaluationContext but without props
  propsEvaluationContext: IEvaluationContext
  propsHaveErrors: boolean | null
  // store attached to the provider page
  providerStore?: Ref<IStore>
  renderForEachPropKey: Nullable<string>
  renderIfExpression: Nullable<string>
  renderType: IElementRenderType | null
  // atom: Nullable<Ref<IAtom>>
  // renderComponentType: Nullable<Ref<IComponent>>
  renderingMetadata: Nullable<RenderingMetadata>
  runtimeProp: Maybe<IElementRuntimeProp>
  slug: string
  /**
   * to render a component we create a duplicate for each element
   * keeps track of source element in case this is a duplicate
   */
  sourceElement: Nullable<IEntity>
  // store attached to closestContainerNode
  store: Ref<IStore>
  /**
   * stringified object, see @IElementStyle interface
   * to see what is the shape of parsed object
   */
  style?: Nullable<string>
  /**
   * html-ready string that includes styles for all breakpoints
   * for production - uses media queries to apply styles
   * for development - uses container queries, for better UX
   */
  styleStringWithBreakpoints: string
  /**
   * styles that are inherited from other breakpoints,
   * for example, if we have a style for mobile, it will be inherited
   * for desktop, and this prop will display the inherited styles
   * when we edit the desktop breakpoint
   */
  stylesInheritedFromOtherBreakpoints: {
    currentStyles: ElementCssRules
    inheritedStyles: ElementCssRules
  }
  treeViewNode: IElementTreeViewDataNode
  urlProps?: IPropData

  appendToGuiCss(css: CssMap): void
  attachAsNextSibling(sibling: IElementModel): void
  attachAsPrevSibling(sibling: IElementModel): void
  attachToParentAsFirstChild(parentElement: IElementModel): void
  clone(cloneIndex?: number): IElementModel
  connectPrevToNextSibling(): void
  deleteFromGuiCss(propNames: Array<string>): void
  detachAsFirstChild(): void
  detachFromParent(): void
  setCustomCss(css: string): void
  setFirstChild(firstChild: Ref<IElementModel>): void
  setName(name: string): void
  setNextSibling(nextSibling: Ref<IElementModel>): void
  setOrderInParent(order: number | null): void
  setPage(page: Ref<IPageModel>): void
  setParentComponent(component: Ref<IComponentModel>): void
  setParentElement(parent: Ref<IElementModel>): void
  setPrevSibling(prevSibling: Ref<IElementModel>): void
  setProps(props: Nullable<Ref<IProp>>): void
  setRenderForEachPropKey(key: string): void
  setRenderIfExpression(key: Nullish<string>): void
  setRenderType(renderType: IElementRenderType): void
  setRenderingError(error: Nullish<RenderingError>): void
  setSourceElement(element: Ref<IElementModel>): void
  toUpdateNodesInput(): Pick<
    ElementUpdateInput,
    'firstChild' | 'nextSibling' | 'parent' | 'prevSibling'
  >
}

export type IElementRef = string
