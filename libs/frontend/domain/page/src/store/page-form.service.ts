import type { IEntityFormService, IPage } from '@codelab/frontend/abstract/core'
import { InlineFormService } from '@codelab/frontend/shared/utils'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/PageFormService')
export class PageFormService
  extends ExtendedModel(
    modelClass<InlineFormService<Ref<IPage>>>(InlineFormService),
    {},
  )
  implements IEntityFormService<Ref<IPage>, { page: Maybe<IPage> }>
{
  @computed
  get page() {
    return this.metadata?.current
  }
}
