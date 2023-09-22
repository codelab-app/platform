import type {
  IEntityFormService,
  IResourceModel,
} from '@codelab/frontend/abstract/core'
import { InlineFormService } from '@codelab/frontend/domain/shared'
import type { Maybe } from '@codelab/shared/abstract/types'
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
    IEntityFormService<
      Ref<IResourceModel>,
      { resource: Maybe<IResourceModel> }
    >
{
  @computed
  get resource() {
    return this.metadata?.current
  }
}
