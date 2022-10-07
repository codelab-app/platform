import { UpdateElementsMutationVariables } from '@codelab/shared/abstract/codegen'
import { Maybe, Nullable, Nullish } from '@codelab/shared/abstract/types'
import { ObjectMap, Ref } from 'mobx-keystone'
import { ELEMENT_NODE_TYPE, INodeType } from '../../base/node.interface'
import { ICacheService } from '../../service'
import { IBuilderDataNode } from '../../ui'
import { IAtom } from '../atom'
import { IComponent } from '../component'
import { IHook } from '../hook'
import { IProp, IPropData, IPropMapBinding } from '../prop'
import { IAuth0Id } from '../user'
import { IElementDTO } from './element.dto.interface'

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
export interface renderingMetadata {
  error: Nullish<RenderingError>
}

export interface IElement
  extends INodeType<ELEMENT_NODE_TYPE>,
    ICacheService<IElementDTO, IElement> {
  id: string
  isRoot: boolean
  owner: Nullable<IAuth0Id>
  name: Nullable<string>
  customCss: Nullable<string>
  guiCss: Nullable<string>
  props?: Nullable<IProp>
  atom: Nullable<Ref<IAtom>>
  hooks: Array<IHook>
  parentId: Nullable<string>
  parentElement: Maybe<IElement>
  propMapBindings: ObjectMap<IPropMapBinding>
  parentComponent: Nullable<Ref<IComponent>>
  label: string
  propTransformationJs: Nullable<string>
  preRenderActionId: Nullish<string>
  postRenderActionId: Nullish<string>
  children: Array<IElement>
  renderForEachPropKey: Nullable<string>
  renderIfPropKey: Nullable<string>
  renderComponentType: Nullable<Ref<IComponent>>
  renderingMetadata: Nullable<renderingMetadata>
  ancestorError: Nullish<RenderingError>
  antdNode: IBuilderDataNode
  leftHandDescendants: Array<IElement>
  descendants: Array<IElement>
  __metadataProps: object
  atomName: string

  nextSibling: Maybe<IElement>
  nextSiblingId: Nullable<string>
  prevSibling: Maybe<IElement>
  prevSiblingId: Nullable<string>

  detachNextSibling(): () => void
  detachPrevSibling(): () => void
  detachParent(): () => void
  attachPrevToNextSibling(): () => void
  attachToParentAsFirstChild(parentElementId: string): () => void
  attachToParent(parentElementId: string): () => void
  appendSibling(siblingId: string): () => void
  prependSibling(siblingId: string): () => void

  makeDetachNextSiblingInput(): UpdateElementsMutationVariables | null
  makeDetachPrevSiblingInput(): UpdateElementsMutationVariables | null
  makeDetachParentInput(): UpdateElementsMutationVariables | null
  makeAttachToParentAsFirstChildInput(
    parentElementId: string,
  ): UpdateElementsMutationVariables
  makeAppendSiblingInput(siblingId: string): UpdateElementsMutationVariables
  makePrependSiblingInput(siblingId: string): UpdateElementsMutationVariables

  firstChild: Maybe<IElement>
  firstChildId: Nullable<string>
  addPropMapBinding(propMapBinding: IPropMapBinding): void
  setOrderInParent(order: number | null): void
  /**
   * Keeps the ref in place
   */
  applyPropMapBindings(sourceProps: IPropData): {
    localProps: IPropData
    globalProps: IPropData
  }
  executePropTransformJs(props: IPropData): IPropData

  appendToGuiCss(css: CssMap): void
  deleteFromGuiCss(propNames: Array<string>): void

  setRenderingError(error: Nullish<RenderingError>): void
}

export type IElementRef = string
