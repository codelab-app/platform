import type {
  IEntityFormService,
  IField,
  IInterfaceType,
} from '@codelab/frontend/abstract/core'
import { InlineFormService } from '@codelab/frontend/shared/utils'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/CreateFieldFormService')
export class CreateFieldFormService
  extends ExtendedModel(
    modelClass<InlineFormService<Ref<IInterfaceType>>>(InlineFormService),
    {},
  )
  implements
    IEntityFormService<
      Ref<IInterfaceType>,
      { interface: Maybe<IInterfaceType> }
    >
{
  @computed
  get interface() {
    return this.metadata?.current
  }
}

@model('@codelab/FieldFormService')
export class FieldFormService
  extends ExtendedModel(
    modelClass<InlineFormService<Ref<IField>>>(InlineFormService),
    {},
  )
  implements IEntityFormService<Ref<IField>, { field: Maybe<IField> }>
{
  @computed
  get field() {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return this.metadata?.current
  }
}
