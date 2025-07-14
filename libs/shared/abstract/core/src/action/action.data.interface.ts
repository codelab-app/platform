import type { ObjectLike } from '@codelab/shared-abstract-types'

import type { IRef } from '../model'
import type { IResourceFetchConfig } from '../resource'
import type { IActionKind } from './action-kind.enum'

/**
 * Base
 */
export interface IBaseActionCreateFormData extends ObjectLike {
  id: string
  name: string
  store: IRef
  type: IActionKind
}

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
