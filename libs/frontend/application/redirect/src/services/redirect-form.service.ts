import { IEntityFormService } from '@codelab/frontend/abstract/application'
import type {
  IPageModel,
  IRedirectModel,
} from '@codelab/frontend/abstract/domain'
import { InlineFormService } from '@codelab/frontend/domain/shared'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/CreateRedirectFormService')
export class CreateRedirectFormService
  extends ExtendedModel(
    modelClass<InlineFormService<Ref<IPageModel>>>(InlineFormService),
    {},
  )
  implements
    IEntityFormService<Ref<IPageModel>, { selectedPage: Ref<IPageModel> }>
{
  @computed
  get selectedPage() {
    return this.metadata
  }
}

@model('@codelab/RedirectFormService')
export class RedirectFormService
  extends ExtendedModel(
    modelClass<InlineFormService<Ref<IRedirectModel>>>(InlineFormService),
    {},
  )
  implements
    IEntityFormService<Ref<IRedirectModel>, { redirect: IRedirectModel }>
{
  @computed
  get redirect() {
    return this.metadata?.current
  }
}