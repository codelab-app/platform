import * as Types from '@codelab/shared/abstract/codegen'
import { Maybe, Nullable, Nullish } from '@codelab/shared/abstract/types'
import { ObjectMap, Ref } from 'mobx-keystone'
import { ELEMENT_NODE_TYPE, INodeType } from '../../base/node.interface'
import { IBuilderDataNode } from '../../ui'
import { IAtom } from '../atom'
import { IComponent } from '../component'
import { IHook } from '../hook'
import { IProp, IPropData, IPropMapBinding } from '../prop'
import { IAuth0Id } from '../user'
import { IElementDTO } from './element.dto.interface'

export interface BatchUpdateElementsMutationVariable {
  where?: Types.InputMaybe<Types.ElementWhere>
  update?: Types.InputMaybe<Types.ElementUpdateInput>
}

/**
 * This is a non-element type node that contains the root element.
 *
 * - App, Page, Component
 */
export interface IElementContainer {
  id: string
  rootElementId: string
}

export interface cssMap {
  [prop: string]: string
}

export interface IElement extends INodeType<ELEMENT_NODE_TYPE> {
  id: string
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
  component: Nullable<Ref<IComponent>>
  label: string
  propTransformationJs: Nullable<string>
  preRenderActionId: Nullish<string>
  postRenderActionId: Nullish<string>
  childrenSorted: Array<IElement>
  renderForEachPropKey: Nullable<string>
  renderIfPropKey: Nullable<string>
  instanceOfComponent: Nullable<Ref<IComponent>>
  antdNode: IBuilderDataNode
  children: ObjectMap<Ref<IElement>>
  leftHandDescendants: Array<IElement>
  descendants: Array<IElement>
  __metadataProps: object
  atomName: string
  siblings?: ObjectMap<Ref<IElement>>

  nextSibling: Maybe<IElement>
  nextSiblingId: Nullable<string>
  prevSibling: Maybe<IElement>
  prevSiblingId: Nullable<string>

  detachNextSibling(): void
  detachPrevSibling(): void
  detachParent(): void
  attachToParentAsSubRoot(parentElementId: string): void
  attachToParent(parentElementId: string): void
  appendSibling(siblingId: string): void
  prependSibling(siblingId: string): void

  makeDetachNextSiblingInput(): BatchUpdateElementsMutationVariable | null
  makeDetachPrevSiblingInput(): BatchUpdateElementsMutationVariable | null
  makeDetachParentInput(): BatchUpdateElementsMutationVariable | null
  makeAttachToParentAsSubRootInput(
    parentElementId: string,
  ): BatchUpdateElementsMutationVariable
  makeAttachToParentInput(
    parentElementId: string,
  ): BatchUpdateElementsMutationVariable
  makeAppendSiblingInput(siblingId: string): BatchUpdateElementsMutationVariable
  makePrependSiblingInput(
    siblingId: string,
  ): BatchUpdateElementsMutationVariable

  childrenRoot: Maybe<IElement>
  childrenRootId: Nullable<string>
  updateCache(data: Omit<IElementDTO, '__typename'>): IElement
  addPropMapBinding(propMapBinding: IPropMapBinding): void
  findDescendant(id: string): Maybe<IElement>
  setOrderInParent(order: number | null): void
  addChild(id: string, child: Ref<IElement>): void
  hasChild(child: IElement): boolean
  /**
   * Removes the ref
   */
  removeChild(element: IElement): void
  /**
   * Keeps the ref in place
   */
  applyPropMapBindings(sourceProps: IPropData): {
    localProps: IPropData
    globalProps: IPropData
  }
  executePropTransformJs(props: IPropData): IPropData

  appendToGuiCss(css: cssMap): void
  deleteFromGuiCss(propNames: Array<string>): void
}

export type IElementRef = string
