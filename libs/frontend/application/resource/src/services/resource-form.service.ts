import type { IEntityFormService } from '@codelab/frontend/abstract/application'
import type { IResourceModel } from '@codelab/frontend/abstract/domain'
import { InlineFormService } from '@codelab/frontend/application/shared/store'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/ResourceFormService')
export class ResourceFormService
  extends ExtendedModel(
    modelClass<InlineFormService<Ref<IResourceModel>>>(InlineFormService),
    {},
  )
  implements
    IEntityFormService<Ref<IResourceModel>, { resource?: IResourceModel }>
{
  @computed
  get resource() {
    return this.metadata?.current
  }
}
