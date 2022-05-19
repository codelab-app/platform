import { Maybe, Nullable } from '@codelab/shared/abstract/types'
import { ObjectMap, Ref } from 'mobx-keystone'
import { ELEMENT_NODE_TYPE, INodeType } from '../../base/node.interface'
import { IBuilderDataNode } from '../../ui'
import { IAtom } from '../atom'
import { IComponent } from '../component'
import { IHook } from '../hook'
import { IProp, IPropData, IPropMapBinding } from '../prop'
import { IAuth0Id } from '../user'
import { IElementDTO } from './element.dto.interface'

export interface IElement extends INodeType<ELEMENT_NODE_TYPE> {
  id: string
  owner: Nullable<IAuth0Id>
  name: Nullable<string>
  css: Nullable<string>
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
  // isComponentElement: boolean

  updateCache(data: Omit<IElementDTO, '__typename'>): IElement
  addPropMapBinding(propMapBinding: IPropMapBinding): void
  findDescendant(id: string): Maybe<IElement>
  setOrderInParent(order: number | null): void
  addChild(child: IElement): void
  hasChild(child: IElement): boolean
  removeChild(element: IElement): void
  applyPropMapBindings(sourceProps: IPropData): {
    localProps: IPropData
    globalProps: IPropData
  }
  executePropTransformJs(props: IPropData): IPropData
}

export type IElementRef = string
