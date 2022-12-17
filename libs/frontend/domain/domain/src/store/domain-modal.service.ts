import type { IEntityModalService } from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'
import type { Domain } from './domain.model'

@model('@codelab/DomainModalService')
export class DomainModalService
  extends ExtendedModel(modelClass<ModalService<Ref<Domain>>>(ModalService), {})
  implements IEntityModalService<Ref<Domain>, { domain: Maybe<Domain> }>
{
  @computed
  get domain() {
    return this.metadata?.current
  }
}
