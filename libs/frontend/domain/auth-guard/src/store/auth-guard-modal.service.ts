import type {
  CreateAuthGuardData,
  CreateAuthGuardProperties,
  IAuthGuardModel,
  IEntityModalService,
} from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend/domain/shared'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/CreateAuthGuardModalService')
export class CreateAuthGuardModalService
  extends ExtendedModel(
    modelClass<ModalService<CreateAuthGuardData>>(ModalService),
    {},
  )
  implements
    IEntityModalService<CreateAuthGuardData, CreateAuthGuardProperties>
{
  @computed
  get type() {
    return this.metadata?.type
  }
}

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
