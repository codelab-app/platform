import type {
  IAuthGuardModel,
  IAuthGuardRef,
  ICreateAuthGuardData,
  IUpdateAuthGuardData,
} from '@codelab/frontend/abstract/domain'
import type {
  AuthGuardOptions,
  AuthGuardWhere,
} from '@codelab/shared/abstract/codegen'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { DefaultOptionType } from 'antd/lib/select'
import type { ICRUDService, IQueryService } from '../services'

export interface IAuthGuardService
  extends ICRUDService<
      IAuthGuardModel,
      ICreateAuthGuardData,
      IUpdateAuthGuardData
    >,
    IQueryService<IAuthGuardModel, AuthGuardWhere, AuthGuardOptions> {
  authGuardList: Array<IAuthGuardModel>

  authGuard(authGuard: IAuthGuardRef): Maybe<IAuthGuardModel>
  getSelectAuthGuardOptions(): Promise<Array<DefaultOptionType>>
}
