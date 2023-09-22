import type {
  IEntityFormService,
  ITagModel,
} from '@codelab/frontend/abstract/core'
import { InlineFormService } from '@codelab/frontend/domain/shared'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/TagFormService')
export class TagFormService
  extends ExtendedModel(
    modelClass<InlineFormService<Ref<ITagModel>>>(InlineFormService),
    {},
  )
  implements IEntityFormService<Ref<ITagModel>, { tag: Maybe<ITagModel> }>
{
  @computed
  get tag() {
    return this.metadata?.current
  }
}
