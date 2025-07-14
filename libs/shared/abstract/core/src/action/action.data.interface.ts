import type { IRef } from '../model'
import type { IResourceFetchConfig } from '../resource'
import type { IActionDto } from './action.dto.interface'

/**
 * Base
 */
export type IBaseActionCreateFormData = Pick<
  IActionDto,
  'id' | 'name' | 'store' | 'type'
>

export interface IApiActionCreateFormData extends IBaseActionCreateFormData {
  config: {
    id: string
    data: IResourceFetchConfig
  }
  errorAction?: IRef
  id: string
  name: string
  resource: IRef
  successAction?: IRef
  // Can't use here, enum type field in uniform will complain
  // type: IActionKind.ApiAction
}

export interface ICodeActionCreateFormData extends IBaseActionCreateFormData {
  code: string
}

/**
 * Need to use & since uniform doesn't handle union type.
 */
export type ICreateActionData = IApiActionCreateFormData &
  ICodeActionCreateFormData

export type IUpdateActionData = ICreateActionData
