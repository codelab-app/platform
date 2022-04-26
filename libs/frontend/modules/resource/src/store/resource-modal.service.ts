import { ModalService } from '@codelab/frontend/shared/utils'
import { IModalService, IResource } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'

@model('@codelab/ResourceModalService')
export class ResourceModalService
  extends ExtendedModel(() => ({
    baseModel: modelClass<ModalService<Ref<IResource>>>(ModalService),
    props: {},
  }))
  implements IModalService<Ref<IResource>>
{
  @computed
  get resource() {
    return this.metadata?.current
  }
}
