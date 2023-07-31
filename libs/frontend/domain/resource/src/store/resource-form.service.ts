import type {
  IEntityFormService,
  IResource,
} from '@codelab/frontend/abstract/core'
import type { InlineFormService } from '@codelab/frontend/shared/utils'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'

@model('@codelab/ResourceFormService')
export class ResourceFormService
  extends ExtendedModel(
    modelClass<InlineFormService<Ref<IResource>>>(ModalService),
    {},
  )
  implements IEntityFormService<Ref<IResource>, { resource: Maybe<IResource> }>
{
  @computed
  get resource() {
    return this.metadata?.current
  }
}
