import type { Ref } from 'mobx-keystone'
import {
  type IRuntimeContainerNodeModel,
  runtimeContainerNodeRef,
} from './runtime-container-node'
import {
  type IRuntimeElementModel,
  isRuntimeElement,
  runtimeElementRef,
} from './runtime-element'

export type IRuntimeModel = IRuntimeContainerNodeModel | IRuntimeElementModel

export type IRuntimeModelRef =
  | Ref<IRuntimeContainerNodeModel>
  | Ref<IRuntimeElementModel>

export const runtimeModelRef = (node: IRuntimeModel): IRuntimeModelRef =>
  isRuntimeElement(node)
    ? runtimeElementRef(node.id)
    : runtimeContainerNodeRef(node.id)
