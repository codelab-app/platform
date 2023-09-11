import type { IEntityFormService, ITag } from '@codelab/frontend/abstract/core'
import { InlineFormService } from '@codelab/frontend/shared/utils'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/TagFormService')
export class TagFormService
  extends ExtendedModel(
    modelClass<InlineFormService<Ref<ITag>>>(InlineFormService),
    {},
  )
  implements IEntityFormService<Ref<ITag>, { tag: Maybe<ITag> }>
{
  @computed
  get tag() {
    return this.metadata?.current
  }
}
