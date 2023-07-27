import type { IEntityFormService, IType } from '@codelab/frontend/abstract/core'
import type { InlineFormService } from '@codelab/frontend/shared/utils'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/TypeFormService')
export class TypeFormService
  extends ExtendedModel(
    modelClass<InlineFormService<Ref<IType>>>(ModalService),
    {},
  )
  implements IEntityFormService<Ref<IType>, { type: Maybe<IType> }>
{
  @computed
  get type() {
    return this.metadata?.current
  }
}
