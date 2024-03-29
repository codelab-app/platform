import type { IEntityFormService } from '@codelab/frontend/abstract/application'
import type { IAuthGuardModel } from '@codelab/frontend/abstract/domain'
import { InlineFormService } from '@codelab/frontend/application/shared/store'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/AuthGuardFormService')
export class AuthGuardFormService
  extends ExtendedModel(
    modelClass<InlineFormService<Ref<IAuthGuardModel>>>(InlineFormService),
    {},
  )
  implements
    IEntityFormService<Ref<IAuthGuardModel>, { authGuard: IAuthGuardModel }>
{
  @computed
  get authGuard() {
    return this.metadata?.current
  }
}
