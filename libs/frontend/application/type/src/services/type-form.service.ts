import type { IEntityFormService } from '@codelab/frontend/abstract/application'
import type { ITypeModel } from '@codelab/frontend/abstract/domain'
import { InlineFormService } from '@codelab/frontend/domain/shared'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/TypeFormService')
export class TypeFormService
  extends ExtendedModel(
    modelClass<InlineFormService<Ref<ITypeModel>>>(InlineFormService),
    {},
  )
  implements IEntityFormService<Ref<ITypeModel>, { type?: ITypeModel }>
{
  @computed
  get type() {
    return this.metadata?.current
  }
}
