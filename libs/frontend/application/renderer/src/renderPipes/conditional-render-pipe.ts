import type {
  IRenderOutput,
  IRenderPipe,
  IRuntimeElement,
} from '@codelab/frontend/abstract/application'
import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { IPropData } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import { RenderOutput } from '../utils'
import { BaseRenderPipe } from './render-pipe.base'

@model('@codelab/ConditionalRenderPipe')
export class ConditionalRenderPipe
  extends ExtendedModel(BaseRenderPipe, {
    next: prop<IRenderPipe>(),
  })
  implements IRenderPipe
{
  render(runtimeElement: IRuntimeElement): IRenderOutput {
    const element = runtimeElement.element

    if (this.renderer.shouldRenderElement(runtimeElement)) {
      return this.next.render(runtimeElement)
    }

    if (this.renderer.debugMode) {
      console.info('ConditionalRenderPipe: should stop rendering', {
        element: runtimeElement.element.name,
        value: true,
      })
    }

    return RenderOutput.notRenderable({ element })
  }
}
