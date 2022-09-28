import { ModalService } from '@codelab/frontend/shared/utils'
import {
  IAnyType,
  IEntityModalService,
  IInterfaceType,
} from '@codelab/shared/abstract/core'
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

@model('@codelab/InterfaceTypeModalService')
export class InterfaceTypeModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IInterfaceType>>>(ModalService),
    {},
  )
  implements
    IEntityModalService<
      Ref<IInterfaceType>,
      { interface: Maybe<IInterfaceType> }
    >
{
  @computed
  get interface() {
    return this.metadata?.current
  }
}
