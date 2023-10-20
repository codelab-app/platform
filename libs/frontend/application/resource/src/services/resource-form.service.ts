import type { IEntityFormService } from '@codelab/frontend/abstract/application'
import type { IResourceModel } from '@codelab/frontend/abstract/domain'
import { InlineFormService } from '@codelab/frontend/domain/shared'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/ResourceFormService')
export class ResourceFormService
  extends ExtendedModel(
    modelClass<InlineFormService<IResourceModel>>(InlineFormService),
    {},
  )
  implements IEntityFormService<IResourceModel, { resource?: IResourceModel }>
{
  @computed
  get resource() {
    return this.metadata
  }
}
