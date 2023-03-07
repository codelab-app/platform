import type { IActionKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import type {
  IApiActionDTO,
  ICodeActionDTO,
  IGraphQLActionConfig,
  IRestActionConfig,
} from './actions'

export type IApiActionConfig = IRestActionConfig | IGraphQLActionConfig

/**
 * Base
 */
export interface IBaseActionData {
  id: string
  name: string
  storeId: string
  type: IActionKind
  code?: string
  resourceId?: string
  /**
   * config here is form object and not Action.config which is an IProp instance
   */
  config?: IApiActionConfig
  successActionId?: string
  errorActionId?: string
}

export interface IBaseActionDTO {
  __typename: `${IActionKind.ApiAction}` | `${IActionKind.CodeAction}`
  id: string
  name: string
  type: IActionKind
  store: IEntity
}

/**
 * Action
 */

export type IActionDTO = IApiActionDTO | ICodeActionDTO

export type ICreateActionData = IBaseActionData

export type IUpdateActionData = IBaseActionData
