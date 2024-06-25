import type { IEntityModalService } from '@codelab/frontend/abstract/application'
import type { IAuthGuardModel } from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend-application-shared-store/ui'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/AuthGuardModalService')
export class AuthGuardModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IAuthGuardModel>>>(ModalService),
    {},
  )
  implements IEntityModalService<Ref<IAuthGuardModel>>
{
  @computed
  get authGuard() {
    return this.metadata?.current
  }
}
