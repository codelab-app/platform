import type { IActionKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
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
  code?: string
  /**
   * config here is form object and not Action.config which is an IProp instance
   */
  config?: IApiActionConfig
  errorActionId?: string
  id: string
  name: string
  resourceId?: string
  storeId: string
  successActionId?: string
  type: IActionKind
}

export interface IBaseActionDTO {
  __typename: `${IActionKind.ApiAction}` | `${IActionKind.CodeAction}`
  id: string
  name: string
  store: IEntity
  type: IActionKind
}

/**
 * Action
 */

export type IActionDTO = IApiActionDTO | ICodeActionDTO

export type ICreateActionData = IBaseActionData

export type IUpdateActionData = IBaseActionData
