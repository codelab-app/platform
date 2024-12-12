import type {
  IRenderOutput,
  IRenderPipe,
  IRuntimeElementModel,
} from '@codelab/frontend/abstract/application'

import { ExtendedModel, model, prop } from 'mobx-keystone'

import { BaseRenderPipe } from './render-pipe.base'

@model('@codelab/PreRenderPipe')
export class PreRenderPipe
  extends ExtendedModel(BaseRenderPipe, {
    next: prop<IRenderPipe>(),
  })
  implements IRenderPipe
{
  render(runtimeElement: IRuntimeElementModel): IRenderOutput {
    runtimeElement.runPreRenderActions()

    return this.next.render(runtimeElement)
  }
}
