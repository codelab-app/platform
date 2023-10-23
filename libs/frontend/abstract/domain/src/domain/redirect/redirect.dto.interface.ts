import type { IRedirectKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

/**
 * Base
 */
export interface IBaseRedirectData {
  id: string
  kind: IRedirectKind
}

export interface IPageRedirectData extends IBaseRedirectData {
  page: IEntity
}

export interface IUrlRedirectData extends IBaseRedirectData {
  url: string
}

/**
 * Redirect
 */

export type ICreateRedirectData = IPageRedirectData & IUrlRedirectData

export type IUpdateRedirectData = ICreateRedirectData
