import type {
  IEntityFormService,
  IPageModel,
} from '@codelab/frontend/abstract/core'
import { InlineFormService } from '@codelab/frontend/domain/shared'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/PageFormService')
export class PageFormService
  extends ExtendedModel(
    modelClass<InlineFormService<Ref<IPageModel>>>(InlineFormService),
    {},
  )
  implements IEntityFormService<Ref<IPageModel>, { page: Maybe<IPageModel> }>
{
  @computed
  get page() {
    return this.metadata?.current
  }
}
