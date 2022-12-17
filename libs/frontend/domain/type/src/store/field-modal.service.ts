import type {
  IEntityModalService,
  IField,
  IInterfaceType,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/CreateFieldModalService')
export class CreateFieldModalService
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

@model('@codelab/FieldModalService')
export class FieldModalService
  extends ExtendedModel(modelClass<ModalService<Ref<IField>>>(ModalService), {})
  implements IEntityModalService<Ref<IField>, { field: Maybe<IField> }>
{
  @computed
  get field() {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return this.metadata?.current
  }
}
