import type {
  ElementCreateInput,
  ElementUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IAuth0Owner, IElementDTO } from '@codelab/shared/abstract/core'
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
import type { IComponent } from '../component'
import type { IHook } from '../hook'
import type { IModel } from '../model.interface'
import type { IPage } from '../page'
import type { IProp, IPropData } from '../prop'
import type { IElementRuntimeProp } from '../render'
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

export type TransformPropsFn = (props: IPropData) => IPropData

export interface IElement
  extends Omit<
      IModel<ElementCreateInput, ElementUpdateInput, void>,
      'toDeleteInput'
    >,
    ICacheService<IElementDTO, IElement> {
  ancestorError: Nullish<RenderingError>
  atomName: string
  childMapperComponent?: Nullable<Ref<IComponent>>
  childMapperPreviousSibling?: Nullable<Ref<IElement>>
  childMapperPropKey?: Nullable<string>
  children: Array<IElement>
  // the closest container node that element belongs to
  closestContainerNode: IComponent | IPage
  closestParent: IElement | null
  // the closest rootElement of node (page/component) that element belongs to
  closestRootElement: IElement
  customCss?: Nullable<string>
  // This is a computed property, so we can use model instead of ref
  descendantElements: Array<IElement>
  firstChild?: Nullable<Ref<IElement>>
  guiCss?: Nullable<string>
  hooks: Array<IHook>
  id: string
  isRoot: boolean
  label: string
  name: string
  nextSibling?: Nullable<Ref<IElement>>
  owner: Nullable<IAuth0Owner>
  // page that this element belongs to
  page: Nullable<Ref<IPage>>
  parent?: Nullable<Ref<IElement>>
  // component that this element belongs to
  parentComponent?: Nullable<Ref<IComponent>>
  postRenderAction?: Nullable<Ref<IAction>>
  preRenderAction?: Nullable<Ref<IAction>>
  prevSibling?: Nullable<Ref<IElement>>
  propTransformationJs: Nullable<string>
  props: Ref<IProp>
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

  /**
   * to render a component we create a duplicate for each element
   * keeps track of source element in case this is a duplicate
   */
  sourceElement: Nullable<IEntity>
  // store attached to closestContainerNode
  store: Ref<IStore>
  transformPropsFn: Maybe<TransformPropsFn>
  treeViewNode: IElementTreeViewDataNode
  urlProps?: IPropData

  appendToGuiCss(css: CssMap): void
  attachAsNextSibling(sibling: IElement): void
  attachAsPrevSibling(sibling: IElement): void
  attachToParentAsFirstChild(parentElement: IElement): void
  clone(cloneIndex: number): IElement
  connectPrevToNextSibling(): void
  deleteFromGuiCss(propNames: Array<string>): void
  detachAsFirstChild(): void
  detachFromParent(): void
  setCustomCss(css: string): void
  setFirstChild(firstChild: Ref<IElement>): void
  setName(name: string): void
  setNextSibling(nextSibling: Ref<IElement>): void
  setOrderInParent(order: number | null): void
  setPage(page: Ref<IPage>): void
  setParent(parent: Ref<IElement>): void
  setParentComponent(component: Ref<IComponent>): void
  setPrevSibling(prevSibling: Ref<IElement>): void
  setPropTransformationJs(props: string): void
  setProps(props: Nullable<Ref<IProp>>): void
  setRenderForEachPropKey(key: string): void
  setRenderIfExpression(key: Nullish<string>): void
  setRenderType(renderType: IElementRenderType): void
  setRenderingError(error: Nullish<RenderingError>): void
  setSourceElement(element: Ref<IElement>): void
  toUpdateNodesInput(): Pick<
    ElementUpdateInput,
    'firstChild' | 'nextSibling' | 'parent' | 'prevSibling'
  >
}

export type IElementRef = string
