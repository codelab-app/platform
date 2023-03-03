import type {
  ElementCreateInput,
  ElementUpdateInput,
  UpdateElementsMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type {
  IEntity,
  Maybe,
  Nullable,
  Nullish,
} from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ELEMENT_NODE_TYPE, IPageNodeType } from '../../base/node.interface'
import type { ICacheService } from '../../service'
import type { IBuilderDataNode } from '../../ui'
import type { IComponent } from '../component'
import type { IHook } from '../hook'
import type { IProp, IPropData } from '../prop'
import type { IAuth0Owner } from '../user'
import type { IElementDTO } from './element.dto.interface'
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

export interface IElement
  extends IPageNodeType<ELEMENT_NODE_TYPE>,
    ICacheService<IElementDTO, IElement> {
  id: string
  isRoot: boolean
  owner: Nullable<IAuth0Owner>
  name: string
  customCss?: Nullable<string>
  guiCss?: Nullable<string>
  props: Ref<IProp>
  hooks: Array<IHook>
  parent?: Ref<IElement>
  parentComponent?: Nullable<Ref<IComponent>>
  // parentElement?: IEntity
  label: string
  propTransformationJs: Nullable<string>
  preRenderAction?: Nullish<IEntity>
  postRenderAction?: Nullish<IEntity>
  children: Array<IElement>
  firstChild?: Nullable<Ref<IElement>>
  renderForEachPropKey: Nullable<string>
  renderIfExpression: Nullable<string>
  renderType: IElementRenderType | null
  // atom: Nullable<Ref<IAtom>>
  // renderComponentType: Nullable<Ref<IComponent>>
  renderingMetadata: Nullable<RenderingMetadata>
  ancestorError: Nullish<RenderingError>
  antdNode: IBuilderDataNode
  leftHandDescendants: Array<IElement>
  descendants: Array<IElement>
  __metadataProps: IPropData
  atomName: string
  // slug: string
  nextSibling?: Nullable<Ref<IElement>>
  prevSibling?: Nullable<Ref<IElement>>
  /**
   * the tree's root element
   */
  rootElement: IElement
  /**
   * id of component or page's tree that element belong to
   */
  baseId: string
  /**
   * to render a component we create a duplicate for each element
   * keeps track of source element in case this is a duplicate
   */
  sourceElement: Nullable<IEntity>

  detachNextSibling(): () => void
  detachPrevSibling(): () => void
  detachParent(): () => void
  attachPrevToNextSibling(): () => void
  attachToParentAsFirstChild(parentElement: Ref<IElement>): () => void
  attachToParent(parentElement: Ref<IElement>): () => void
  appendSibling(sibling: Ref<IElement>): () => void
  prependSibling(sibling: Ref<IElement>): () => void
  clone(cloneIndex: number): IElement
  // updateCloneIds(elementMap: Map<string, string>): IElement
  makeDetachNextSiblingInput(): UpdateElementsMutationVariables | null
  makeDetachPrevSiblingInput(): UpdateElementsMutationVariables | null
  makeDetachParentInput(): UpdateElementsMutationVariables | null
  makeAttachToParentAsFirstChildInput(
    parentElement: Ref<IElement>,
  ): UpdateElementsMutationVariables
  makeAppendSiblingInput(siblingId: string): UpdateElementsMutationVariables
  makePrependSiblingInput(siblingId: string): UpdateElementsMutationVariables

  setOrderInParent(order: number | null): void
  setName(name: string): void
  // setAtom(atom: Ref<IAtom>): void
  setRenderType(renderType: IElementRenderType): void
  setSourceElement(element: Ref<IElement>): void
  setParentComponent(componentRef: Ref<IComponent>): void
  setParent(parent: Ref<IElement>): void
  setNextSibling(nextSibling: Ref<IElement>): void
  setPrevSibling(prevSibling: Ref<IElement>): void
  setProps(props: Nullable<Ref<IProp>>): void
  // setRenderComponentType(componentRef: Ref<IComponent>): void
  /**
   * Keeps the ref in place
   */
  executePropTransformJs(props: IPropData): IPropData

  appendToGuiCss(css: CssMap): void
  deleteFromGuiCss(propNames: Array<string>): void

  setRenderingError(error: Nullish<RenderingError>): void
  setRenderIfExpression(key: Nullish<string>): void
  setRenderForEachPropKey(key: string): void
  setPropTransformationJs(props: string): void

  getDescendantRefs: Array<Ref<IElement>>

  toCreateInput(): ElementCreateInput
  toUpdateInput(): ElementUpdateInput
}

export type IElementRef = string
