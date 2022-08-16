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

/**
 * This is a non-element type node that contains the root element.
 *
 * - App, Page, Component
 */
export interface IElementContainer {
  id: string
  rootElementId: string
}

export type cssMap = { [prop: string]: string }

export interface IElement extends INodeType<ELEMENT_NODE_TYPE> {
  id: string
  owner: Nullable<IAuth0Id>
  name: Nullable<string>
  customCss: Nullable<string>
  guiCss: Nullable<string>
  props?: Nullable<IProp>
  atom: Nullable<Ref<IAtom>>
  orderInParent: Nullable<number>
  hooks: Array<IHook>
  parentId: Nullable<string>
  parentElement: Maybe<IElement>
  propMapBindings: ObjectMap<IPropMapBinding>
  component: Nullable<Ref<IComponent>>
  label: string
  propTransformationJs: Nullable<string>
  lastChildOrder: number
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
  siblings: Array<IElement>

  nextSibling: Maybe<IElement>
  nextSiblingId: Nullable<string>
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
  detachChild(element: IElement): void
  applyPropMapBindings(sourceProps: IPropData): {
    localProps: IPropData
    globalProps: IPropData
  }
  executePropTransformJs(props: IPropData): IPropData

  appendToGuiCss(css: cssMap): void
  deleteFromGuiCss(propNames: Array<string>): void
}

export type IElementRef = string
