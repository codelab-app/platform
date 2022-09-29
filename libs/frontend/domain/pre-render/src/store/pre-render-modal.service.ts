import {
  IEntityModalService,
  IPreRender,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { ExtendedModel, model, modelClass, Ref } from 'mobx-keystone'
import { PreRender } from './pre-render.model'

@model('@codelab/PreRenderModalService')
export class PreRenderModalService
  extends ExtendedModel(
    modelClass<ModalService<Ref<IPreRender>>>(ModalService),
    {},
  )
  implements
    IEntityModalService<Ref<IPreRender>, { preRender: Maybe<IPreRender> }>
{
  @computed
  get preRender() {
    return this.metadata?.current
  }
}
