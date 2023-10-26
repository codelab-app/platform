import type {
  IElementModel,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/frontend/abstract/domain'
import type { IPropData } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import { BaseRenderPipe } from './render-pipe.base'

@model('@codelab/PreRenderPipe')
export class PreRenderPipe
  extends ExtendedModel(BaseRenderPipe, {
    next: prop<IRenderPipe>(),
  })
  implements IRenderPipe
{
  render(element: IElementModel, props: IPropData): IRenderOutput {
    const renderer = this.rendererService.activeRenderer?.current

    renderer?.runPreRenderAction(element)

    return this.next.render(element, props)
  }
}
