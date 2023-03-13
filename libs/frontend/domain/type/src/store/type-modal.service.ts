import type {
  IType,
  IEntityModalService,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/TypeModalService')
export class TypeModalService
  extends ExtendedModel(modelClass<ModalService<Ref<IType>>>(ModalService), {})
  implements IEntityModalService<Ref<IType>, { type: Maybe<IType> }>
{
  @computed
  get type() {
    return this.metadata?.current
  }
}
