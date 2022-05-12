import { Maybe, Nullable, Nullish } from '@codelab/shared/abstract/types'
import { DataNode } from 'antd/lib/tree'
import { ObjectMap, Ref } from 'mobx-keystone'
import { ELEMENT_NODE_TYPE, INodeType } from '../../base/node.interface'
import { IAtom } from '../atom'
import { IComponent } from '../component'
import { IHook } from '../hook'
import { IProp, IPropData, IPropMapBinding } from '../prop'
import { IAuth0Id } from '../user'
import { IElementDTO } from './element.dto.interface'

export interface IElement extends INodeType<ELEMENT_NODE_TYPE> {
  id: string
  owner: Nullish<IAuth0Id>
  name: Nullish<string>
  css: Nullish<string>
  props?: Nullish<IProp>
  atom: Nullish<Ref<IAtom>>
  orderInParent: Nullable<number>
  hooks: Array<IHook>
  parentId: Nullish<string>
  parentElement: Maybe<IElement>
  propMapBindings: ObjectMap<IPropMapBinding>
  component: Nullish<Ref<IComponent>>
  label: string
  propTransformationJs: Nullish<string>
  lastChildOrder: number
  childrenSorted: Array<IElement>
  renderForEachPropKey: Nullish<string>
  renderIfPropKey: Nullish<string>
  instanceOfComponent: Nullish<Ref<IComponent>>
  antdNode: DataNode
  children: ObjectMap<Ref<IElement>>
  leftHandDescendants: Array<IElement>
  descendants: Array<IElement>
  __metadataProps: object
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
