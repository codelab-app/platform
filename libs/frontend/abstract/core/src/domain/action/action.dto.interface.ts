import type { IActionKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { IAction } from './action.interface'
import type {
  IApiActionDTO,
  ICodeActionDTO,
  IGraphQLActionConfig,
  IRestActionConfig,
} from './actions'

export type IApiActionConfig = IGraphQLActionConfig | IRestActionConfig

/**
 * Base
 */
export interface IBaseActionData {
  id: string
  name: string
  storeId: string
  type: IActionKind
}

export interface IApiActionData extends IBaseActionData {
  config: {
    id: string
    data: IApiActionConfig
  }
  errorActionId?: string
  id: string
  name: string
  resourceId: string
  source?: Ref<IAction>
  successActionId?: string
}

export interface ICodeActionData extends IBaseActionData {
  code: string
}

export interface IBaseActionDTO {
  __typename: `${IActionKind.ApiAction}` | `${IActionKind.CodeAction}`
  id: string
  name: string
  store: IEntity
}

/**
 * Action
 */

export type IActionDTO = IApiActionDTO | ICodeActionDTO

export type ICreateActionData = IApiActionData & ICodeActionData

export type IUpdateActionData = ICreateActionData
