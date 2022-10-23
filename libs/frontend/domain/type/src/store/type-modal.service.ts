import { IAnyType, IEntityModalService } from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'

@model('@codelab/TypeModalService')
export class TypeModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IAnyType>>>(ModalService),
    {},
  )
  implements IEntityModalService<Ref<IAnyType>, { type: Maybe<IAnyType> }>
{
  @computed
  get type() {
    return this.metadata?.current
  }
}
