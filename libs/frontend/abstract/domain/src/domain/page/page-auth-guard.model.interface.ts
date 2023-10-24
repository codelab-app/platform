import type {
  PageAuthGuardCreateInput,
  PageAuthGuardDeleteInput,
  PageAuthGuardUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IPageAuthGuardDTO } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IAuthGuardModel } from '../auth-guard'
import type { IModel } from '../model.interface'
import type { IRedirectModel } from '../redirect'

export interface IPageAuthGuardModel
  extends Omit<
      IModel<
        PageAuthGuardCreateInput,
        PageAuthGuardUpdateInput,
        PageAuthGuardDeleteInput
      >,
      'toUpdateInput'
    >,
    IEntity,
    ICacheService<IPageAuthGuardDTO, IPageAuthGuardModel> {
  authGuard: Ref<IAuthGuardModel>
  redirect: IRedirectModel
}
