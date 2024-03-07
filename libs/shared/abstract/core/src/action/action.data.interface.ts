import type { IRef } from '../model/node-type.interface'
import type { IResourceFetchConfig } from '../resource'
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
  resource: IRef
  successActionId?: string
  // Can't use here, enum type field in uniform will complain
  // type: IActionKind.ApiAction
}

export interface ICreateCodeActionData extends ICreateBaseActionData {
  code: string
  // type: IActionKind.CodeAction
}

/**
 * Need to use & since uniform doesn't handle union type.
 */
export type ICreateActionData = ICreateApiActionData & ICreateCodeActionData

export type IUpdateActionData = ICreateActionData
