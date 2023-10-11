import type {
  ElementCreateInput,
  ElementUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type {
  IElement,
  IElementDTO,
  IPropData,
} from '@codelab/shared/abstract/core'
import type {
  IEntity,
  Maybe,
  Nullable,
  Nullish,
} from '@codelab/shared/abstract/types'
import type { AnyModel, Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IElementTreeViewDataNode } from '../../ui'
import type { IActionModel } from '../action'
import type { BuilderWidthBreakPoint } from '../builder'
import type { IComponentModel } from '../component'
import type { IHook } from '../hook'
import type { IModel } from '../model.interface'
import type { IPageModel } from '../page'
import type { IPropModel } from '../prop'
import type { IElementRuntimeProp, RendererType } from '../render'
import type { IStoreModel } from '../store'
import type { IElementRenderTypeModel } from './render-type'

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
    ICacheService<IElementDTO, IElementModel>,
    Pick<IElementDTO, 'name'>,
    AnyModel {
  _modified: boolean
  ancestorError: Nullish<RenderingError>
  atomName: string
  childMapperComponent?: Nullable<Ref<IComponentModel>>
  childMapperPreviousSibling?: Nullable<Ref<IElementModel>>
  childMapperPropKey?: Nullable<string>
  children: Array<IElementModel>
  // the closest container node that element belongs to
  closestContainerNode: IComponentModel | IPageModel
  // closestPage: Nullable<Ref<IPageModel>>
  closestParentElement: Ref<IElementModel> | null
  // the closest rootElement of node (page/component) that element belongs to
  closestSubTreeRootElement: IElementModel
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
  isTextContentEditable: boolean
  label: string
  nextSibling?: Nullable<Ref<IElementModel>>
  owner: Nullable<IEntity>
  page: Nullable<Ref<IPageModel>>
  // page that this element belongs to
  // component that this element belongs to
  parentComponent?: Nullable<Ref<IComponentModel>>
  parentElement?: Nullable<Ref<IElementModel>>
  postRenderAction?: Nullable<Ref<IActionModel>>
  preRenderAction?: Nullable<Ref<IActionModel>>
  prevSibling?: Nullable<Ref<IElementModel>>
  props: Ref<IPropModel>
  // same as expressionEvaluationContext but without props
  propsEvaluationContext: IEvaluationContext
  // store attached to the provider page
  providerStore?: Ref<IStoreModel>
  renderForEachPropKey: Nullable<string>
  renderIfExpression: Nullable<string>
  renderType: IElementRenderTypeModel
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
  store: Ref<IStoreModel>
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
  tailwindClassNames?: Nullable<Array<string>>
  toId: object
  toJson: IElement
  toTreeNode: object
  treeViewNode: IElementTreeViewDataNode
  urlProps?: IPropData

  appendToGuiCss(css: CssMap): void
  attachAsFirstChild(parentElement: IElementModel): void
  attachAsNextSibling(sibling: IElementModel): void
  attachAsPrevSibling(sibling: IElementModel): void
  clone(cloneIndex?: number): IElementModel
  deleteFromGuiCss(propNames: Array<string>): void
  detachFromTree(): void
  setCustomCss(css: string): void
  setFirstChild(firstChild: Ref<IElementModel>): void
  setIsTextContentEditable(value: boolean): void
  setName(name: string): void
  setNextSibling(nextSibling: Ref<IElementModel>): void
  setOrderInParent(order: number | null): void
  setParentComponent(component: Ref<IComponentModel>): void
  setParentElement(parent: Ref<IElementModel>): void
  setPrevSibling(prevSibling: Ref<IElementModel>): void
  setProps(props: Nullable<Ref<IPropModel>>): void
  setRenderForEachPropKey(key: string): void
  setRenderIfExpression(key: Nullish<string>): void
  setRenderType(renderType: IElementRenderTypeModel): void
  setRenderingError(error: Nullish<RenderingError>): void
  setSourceElement(element: Ref<IElementModel>): void
  setTailwindClassNames(tailwindClassNames: Array<string>): void
  set_modified(modified: boolean): void
  toUpdateNodesInput(): Pick<
    ElementUpdateInput,
    'firstChild' | 'nextSibling' | 'parentElement' | 'prevSibling'
  >
}

export type IElementRef = string
