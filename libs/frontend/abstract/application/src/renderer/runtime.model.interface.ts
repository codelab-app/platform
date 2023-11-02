import type { Ref } from 'mobx-keystone'
import type { IRuntimeContainerNodeModel } from './runtime-container-node'
import type { IRuntimeElementModel } from './runtime-element'

export type IRuntimeModel = IRuntimeContainerNodeModel | IRuntimeElementModel

export type IRuntimeModelRef =
  | Ref<IRuntimeContainerNodeModel>
  | Ref<IRuntimeElementModel>
