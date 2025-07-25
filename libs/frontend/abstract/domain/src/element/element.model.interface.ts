import type { IElementDto, IRef } from '@codelab/shared-abstract-core'
import type {
  Maybe,
  Nullable,
  Nullish,
  ObjectLike,
} from '@codelab/shared-abstract-types'
import type { Ref } from 'mobx-keystone'

import type { IActionModel } from '../action'
import type { IComponentModel } from '../component'
import type { IHook } from '../hook'
import type { IPageModel } from '../page'
import type { IPropModel } from '../prop'
import type { IModel } from '../shared/models/model.interface'
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

export interface RenderingError {
  message: string
  stack: Maybe<string>
}

// Metadata obtained from the renderer
// regarding the element's rendering
export interface RenderingMetadata {
  error: Nullish<RenderingError>
}

export interface IElementModel extends IModel<IElementDto, IElementModel> {
  _modified: boolean
  ancestorError: Nullish<RenderingError>
  atomName: string
  childMapperComponent?: Nullable<Ref<IComponentModel>>
  childMapperPreviousSibling?: Nullable<Ref<IElementModel>>
  /**
   * One element E1 will have childMapperPropKey that points to a prop which has an array of values.
   *
   * For each on these values we render a component `childMapperComponent` as a child of E1 passing `this` value as prop for this component.
   *
   * Because E1 will contain other children we need chose what is the rendering position of this array of components
   *
   * It can also use `js` to directly input the data `{{[{ name: "test 1" }, { name: "test 2" }]}}`
   *
   * TLDR; a pointer to the array of props for the components
   */
  childMapperPropKey?: Nullable<string>
  children: Array<IElementModel>
  // the closest component that element belongs to
  closestContainerComponent: Maybe<IComponentModel>
  // the closest container node that element belongs to
  closestContainerNode: IComponentModel | IPageModel
  // closestPage: Nullable<Ref<IPageModel>>
  closestParentElement: Ref<IElementModel> | null
  // the closest rootElement of node (page/component) that element belongs to
  closestSubTreeRootElement: IElementModel
  // This is a computed property, so we can use model instead of ref
  descendantElements: Array<IElementModel>
  firstChild?: Nullable<Ref<IElementModel>>
  hooks: Array<IHook>
  id: string
  isRoot: boolean
  label: string
  name: string
  nextSibling?: Nullable<Ref<IElementModel>>
  owner: Nullable<IRef>
  page: Nullable<Ref<IPageModel>>
  // page that this element belongs to
  // component that this element belongs to
  parentComponent?: Nullable<Ref<IComponentModel>>
  parentElement?: Nullable<Ref<IElementModel>>
  postRenderActions?: Array<Ref<IActionModel>>
  preRenderActions?: Array<Ref<IActionModel>>
  prevSibling?: Nullable<Ref<IElementModel>>
  props: IPropModel
  // store attached to the provider page
  providerStore?: IStoreModel
  renderForEachPropKey: Nullable<string>
  renderIfExpression: Nullable<string>
  renderType: IElementRenderTypeModel
  // atom: Nullable<Ref<IAtom>>
  // renderComponentType: Nullable<Ref<IComponent>>
  renderingMetadata: Nullable<RenderingMetadata>
  slug: string
  /**
   * to render a component we create a duplicate for each element
   * keeps track of source element in case this is a duplicate
   */
  sourceElement: Nullable<IRef>
  // store attached to closestContainerNode
  store: Ref<IStoreModel>
  style: Maybe<string>
  tailwindClassNames?: Nullable<Array<string>>
  toId: ObjectLike
  toTreeNode: ObjectLike
  treeTitle: {
    primary: string
    secondary: string | undefined
  }
  attachAsComponentRoot(component: IRef): void
  attachAsFirstChild(parentElement: IElementModel): void
  attachAsNextSibling(sibling: IElementModel): void
  attachAsPrevSibling(sibling: IElementModel): void
  detachFromTree(): IElementModel
  setFirstChild(firstChild: Ref<IElementModel>): void
  setName(name: string): void
  setNextSibling(nextSibling: Ref<IElementModel>): void
  setOrderInParent(order: number | null): void
  setParentElement(parent: Ref<IElementModel>): void
  setPrevSibling(prevSibling: Ref<IElementModel>): void
  setProps(props: IPropModel): void
  setRenderForEachPropKey(key: string): void
  setRenderIfExpression(key: Nullish<string>): void
  setRenderType(renderType: IElementRenderTypeModel): void
  setRenderingError(error: Nullish<RenderingError>): void
  setSourceElement(element: Ref<IElementModel>): void
  setStyle(style: string): void
  setTailwindClassNames(tailwindClassNames: Array<string>): void
  set_modified(modified: boolean): void
}
