import type { UpdateElementsMutationVariables } from '@codelab/shared/abstract/codegen'
import type {
  IEntity,
  Maybe,
  Nullable,
  Nullish,
} from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ELEMENT_NODE_TYPE, INodeType } from '../../base/node.interface'
import type { ICacheService } from '../../service'
import type { IBuilderDataNode } from '../../ui'
import type { IAtom } from '../atom'
import type { IComponent } from '../component'
import type { IHook } from '../hook'
import type { IProp, IPropData } from '../prop'
import type { IElementDTO } from './element.dto.interface'

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

export interface IElement extends INodeType<ELEMENT_NODE_TYPE> {
  id: string
  isRoot: boolean
  owner: Nullable<string>
  name: string
  customCss: Nullable<string>
  guiCss: Nullable<string>
  props?: Nullable<IProp>
  atom: Nullable<Ref<IAtom>>
  hooks: Array<IHook>
  parent: Nullable<IEntity>
  parentComponent: Nullable<Ref<IComponent>>
  parentElement: Maybe<IElement>
  label: string
  propTransformationJs: Nullable<string>
  preRenderAction: Nullish<IEntity>
  postRenderAction: Nullish<IEntity>
  children: Array<IElement>
  firstChild?: Ref<IElement>
  renderForEachPropKey: Nullable<string>
  renderIfExpression: Nullable<string>
  renderComponentType: Nullable<Ref<IComponent>>
  renderingMetadata: Nullable<RenderingMetadata>
  ancestorError: Nullish<RenderingError>
  antdNode: IBuilderDataNode
  leftHandDescendants: Array<IElement>
  descendants: Array<IElement>
  __metadataProps: IPropData
  atomName: string
  // slug: string
  nextSibling?: Ref<IElement>
  prevSibling?: Ref<IElement>
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
  setAtom(atom: Ref<IAtom>): void
  setSourceElement(element: Ref<IElement>): void
  setParentComponent(componentRef: Ref<IComponent>): void
  setParent(parent: Nullable<Ref<IElement>>): void
  setNextSibling(nextSibling: Ref<IElement>): void
  setPrevSibling(prevSibling: Ref<IElement>): void
  setProps(props: Nullable<IProp>): void
  setRenderComponentType(componentRef: Ref<IComponent>): void
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
}

export type IElementRef = string
