import type { IRedirectKind } from '@codelab/shared/abstract/core'

export interface IBaseRedirect {
  id: string
  kind: IRedirectKind
}

export type IRedirectRef = string
