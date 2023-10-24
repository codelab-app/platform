import type { IPage } from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import type {
  ICreatePageAuthGuardData,
  IUpdatePageAuthGuardData,
} from './page-auth-guard.dto.interface'

/**
 * IOwnerSchema is required for store api
 */
export type ICreatePageData = Pick<
  IPage,
  'app' | 'id' | 'kind' | 'name' | 'url'
> & {
  authGuard?: Nullish<ICreatePageAuthGuardData>
}

export type IUpdatePageData = Pick<
  IPage,
  'app' | 'id' | 'name' | 'pageContentContainer' | 'url'
> & {
  authGuard?: Nullish<IUpdatePageAuthGuardData>
}
