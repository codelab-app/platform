import type { IEntityFormService } from '@codelab/frontend/abstract/application'
import type { IPageModel } from '@codelab/frontend/abstract/domain'
import { InlineFormService } from '@codelab/frontend/application/shared/store'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/PageFormService')
export class PageFormService
  extends ExtendedModel(
    modelClass<InlineFormService<Ref<IPageModel>>>(InlineFormService),
    {},
  )
  implements IEntityFormService<Ref<IPageModel>, { page?: IPageModel }>
{
  @computed
  get page() {
    return this.metadata?.current
  }
}
