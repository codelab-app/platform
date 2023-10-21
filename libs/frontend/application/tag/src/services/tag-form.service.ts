import type { IEntityFormService } from '@codelab/frontend/abstract/application'
import type { ITagModel } from '@codelab/frontend/abstract/domain'
import { InlineFormService } from '@codelab/frontend/domain/shared'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/TagFormService')
export class TagFormService
  extends ExtendedModel(
    modelClass<InlineFormService<ITagModel>>(InlineFormService),
    {},
  )
  implements IEntityFormService<ITagModel, { tag?: ITagModel }>
{
  @computed
  get tag() {
    return this.metadata
  }
}
