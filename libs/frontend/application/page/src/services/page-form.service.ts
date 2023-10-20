import type { IEntityFormService } from '@codelab/frontend/abstract/application'
import type { IPageModel } from '@codelab/frontend/abstract/domain'
import { InlineFormService } from '@codelab/frontend/domain/shared'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/PageFormService')
export class PageFormService
  extends ExtendedModel(
    modelClass<InlineFormService<IPageModel>>(InlineFormService),
    {},
  )
  implements IEntityFormService<IPageModel, { page?: IPageModel }>
{
  @computed
  get page() {
    return this.metadata
  }
}
