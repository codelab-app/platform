import type { IEntityFormService } from '@codelab/frontend/abstract/application'
import type { ITypeModel } from '@codelab/frontend/abstract/domain'
import { InlineFormService } from '@codelab/frontend/domain/shared'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/TypeFormService')
export class TypeFormService
  extends ExtendedModel(
    modelClass<InlineFormService<ITypeModel>>(InlineFormService),
    {},
  )
  implements IEntityFormService<ITypeModel, { type?: ITypeModel }>
{
  @computed
  get type() {
    return this.metadata
  }
}
