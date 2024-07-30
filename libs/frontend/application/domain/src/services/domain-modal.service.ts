import type { IEntityModalService } from '@codelab/frontend/abstract/application'
import type { IDomainModel } from '@codelab/frontend/abstract/domain'
import { ModalService } from '@codelab/frontend-application-shared-store/ui'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/DomainModalService')
export class DomainModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IDomainModel>>>(ModalService),
    {},
  )
  implements IEntityModalService<Ref<IDomainModel>, { domain?: IDomainModel }>
{
  @computed
  get domain() {
    return this.data?.current
  }
}
