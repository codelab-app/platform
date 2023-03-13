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

export interface IElement extends ICacheService<IElementDTO, IElement> {
  __metadataProps: IPropData
  ancestorError: Nullish<RenderingError>
  antdNode: IBuilderDataNode
  atomName: string
  /**
   * id of component or page's tree that element belong to
   */
  baseId: string
  children: Array<IElement>
  customCss?: Nullable<string>
  // This is a computed property, so we can use model instead of ref
  descendantElements: Array<IElement>
  firstChild?: Nullable<Ref<IElement>>
  guiCss?: Nullable<string>
  hooks: Array<IHook>
  id: string
  isRoot: boolean
  label: string
  leftHandDescendants: Array<IElement>
  name: string
  nextSibling?: Nullable<Ref<IElement>>
  owner: Nullable<IAuth0Owner>
  parent?: Nullable<Ref<IElement>>
  parentComponent?: Nullable<Ref<IComponent>>
  postRenderAction?: Nullish<IEntity>
  preRenderAction?: Nullish<IEntity>
  prevSibling?: Nullable<Ref<IElement>>
  propTransformationJs: Nullable<string>
  props: Ref<IProp>
  renderForEachPropKey: Nullable<string>
  renderIfExpression: Nullable<string>
  renderType: IElementRenderType | null
  // atom: Nullable<Ref<IAtom>>
  // renderComponentType: Nullable<Ref<IComponent>>
  renderingMetadata: Nullable<RenderingMetadata>
  /**
   * the tree's root element
   */
  rootElement: IElement
  /**
   * to render a component we create a duplicate for each element
   * keeps track of source element in case this is a duplicate
   */
  sourceElement: Nullable<IEntity>

  addParent(parentElement: IElement): () => void
  appendToGuiCss(css: CssMap): void
  attachAsNextSibling(sibling: Ref<IElement>): () => void
  attachAsPrevSibling(sibling: IElement): () => void
  attachToParentAsFirstChild(parentElement: IElement): () => void
  clone(cloneIndex: number): IElement
  connectPrevToNextSibling(): () => void
  deleteFromGuiCss(propNames: Array<string>): void
  detachFromParent(): () => void
  executePropTransformJs(props: IPropData): IPropData
  makeAttachAsNextSiblingInput(
    siblingId: string,
  ): UpdateElementsMutationVariables
  makeAttachAsPrevSiblingInput(
    siblingId: string,
  ): UpdateElementsMutationVariables
  makeAttachToParentAsFirstChildInput(
    parentElement: IElement,
  ): UpdateElementsMutationVariables
  makeDetachFromNextSiblingInput(): UpdateElementsMutationVariables | null
  makeDetachFromParentInput(): UpdateElementsMutationVariables | null
  makeDetachFromPrevSiblingInput(): UpdateElementsMutationVariables | null
  setName(name: string): void
  setNextSibling(nextSibling: Ref<IElement>): void
  setOrderInParent(order: number | null): void
  setParent(parent: Ref<IElement>): void
  setParentComponent(componentRef: Ref<IComponent>): void
  setPrevSibling(prevSibling: Ref<IElement>): void
  setPropTransformationJs(props: string): void
  setProps(props: Nullable<Ref<IProp>>): void
  setRenderForEachPropKey(key: string): void
  setRenderIfExpression(key: Nullish<string>): void
  setRenderType(renderType: IElementRenderType): void
  setRenderingError(error: Nullish<RenderingError>): void
  setSourceElement(element: Ref<IElement>): void
  // setRenderComponentType(componentRef: Ref<IComponent>): void
  // getDescendantRefs: Array<Ref<IElement>>
  toCreateInput(): ElementCreateInput
  toUpdateInput(): ElementUpdateInput
}

export type IElementRef = string
