import { Nullish } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { IProp } from '../prop'
import { IResource } from '../resource'
import { IActionKind } from './action-kind.enum'
import { IGraphQLActionConfig } from './graphql-action-config.interface'
import { IRestActionConfig } from './rest-action-config.interface'

interface IActionBase {
  id: string
  name: string
  runOnInit: boolean
  storeId: string
  type: IActionKind
}

export interface ICustomAction extends IActionBase {
  code: string
}

export type IResourceActionConfig = IProp<
  IRestActionConfig | IGraphQLActionConfig
>

export interface IResourceAction extends IActionBase {
  resource: Nullish<Ref<IResource>>
  config: Nullish<IResourceActionConfig>
  success: Ref<IAction>
  error: Ref<IAction>
}

export interface IPipelineAction extends IActionBase {
  actions: Array<Ref<IAction>>
  actionsSorted: Array<IAction>
}

export type IAction = ICustomAction | IResourceAction | IPipelineAction
