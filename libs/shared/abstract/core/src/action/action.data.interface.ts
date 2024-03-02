import type { IResourceFetchConfig } from '../resource'
import { IAction } from './action.dto.interface'
import type { IActionKind } from './action-kind.enum'

/**
 * Base
 */
export interface ICreateBaseActionData {
  id: string
  name: string
  storeId: string
  type: IActionKind
}

export interface ICreateApiActionData extends ICreateBaseActionData {
  config: {
    id: string
    data: IResourceFetchConfig
  }
  errorActionId?: string
  id: string
  name: string
  resourceId: string
  successActionId?: string
  type: IActionKind.ApiAction
}

export interface ICreateCodeActionData extends ICreateBaseActionData {
  code: string
  type: IActionKind.CodeAction
}

/**
 * Action
 */

export type ICreateActionData = ICreateApiActionData | ICreateCodeActionData

export type IUpdateActionData = ICreateActionData
