import { ModalService } from '@codelab/frontend/shared/utils'
import { IModalService } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'
import { Domain } from './domain.model'

@model('@codelab/DomainModalService')
export class DomainModalService
  extends ExtendedModel(modelClass<ModalService<Ref<Domain>>>(ModalService), {})
  implements IModalService<Ref<Domain>, { domain: Maybe<Domain> }>
{
  @computed
  get domain() {
    return this.metadata?.current
  }
}
