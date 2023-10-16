import type { IActionKind } from '@codelab/shared/abstract/core'
import type { IResourceFetchConfig } from '../resource'

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
    data: IResourceFetchConfig
  }
  errorActionId?: string
  id: string
  name: string
  resourceId: string
  successActionId?: string
}

export interface ICodeActionData extends IBaseActionData {
  code: string
}

/**
 * Action
 */

export type ICreateActionData = IApiActionData & ICodeActionData

export type IUpdateActionData = ICreateActionData
