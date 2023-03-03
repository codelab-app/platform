import type { IActionKind } from '@codelab/shared/abstract/core'
import type { IStoreDTO } from '../store'
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
  config?: IApiActionConfig
  successActionId?: string
  errorActionId?: string
}

export interface IBaseActionDTO {
  __typename: `${IActionKind.ApiAction}` | `${IActionKind.CodeAction}`
  id: string
  name: string
  type: IActionKind
  store: Pick<IStoreDTO, 'id' | 'name'>
}

/**
 * Action
 */

export type IActionDTO = IApiActionDTO | ICodeActionDTO

export type ICreateActionData = IBaseActionData

export type IUpdateActionData = IBaseActionData
