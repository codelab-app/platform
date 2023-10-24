import type { IPageAuthGuardDTO } from '@codelab/shared/abstract/core'
import type { ICreateRedirectData, IUpdateRedirectData } from '../redirect'

export type ICreatePageAuthGuardData = Omit<IPageAuthGuardDTO, 'redirect'> & {
  redirect: ICreateRedirectData
}

export type IUpdatePageAuthGuardData = Omit<IPageAuthGuardDTO, 'redirect'> & {
  redirect: IUpdateRedirectData
}
