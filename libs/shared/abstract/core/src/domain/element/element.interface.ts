import { Maybe, Nullable, Nullish } from '@codelab/shared/abstract/types'
import { DataNode } from 'antd/lib/tree'
import { ObjectMap, Ref } from 'mobx-keystone'
import { IAtom } from '../atom'
import { IComponent } from '../component'
import { IHook } from '../hook'
import { IProp, IPropMapBinding } from '../prop'
import { IElementDTO } from './element.dto.interface'

export interface IElement {
  id: string
  name: Nullish<string>
  css: Nullish<string>
  props?: Nullish<IProp>
  atom: Nullish<Ref<IAtom>>
  orderInParent: Nullable<number>
  hooks: Array<IHook>
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

  updateCache(data: Omit<IElementDTO, '__typename'>): void
}

export type IElementRef = string
