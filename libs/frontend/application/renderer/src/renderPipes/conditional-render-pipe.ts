import type {
  IElementModel,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/frontend/abstract/domain'
import type { IPropData } from '@codelab/shared/abstract/core'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import { RenderOutput, shouldRenderElement } from '../utils'
import { BaseRenderPipe } from './render-pipe.base'

@model('@codelab/ConditionalRenderPipe')
export class ConditionalRenderPipe
  extends ExtendedModel(BaseRenderPipe, {
    next: prop<IRenderPipe>(),
  })
  implements IRenderPipe
{
  render(element: IElementModel, props: IPropData): IRenderOutput {
    if (shouldRenderElement(element, props)) {
      return this.next.render(element, props)
    }

    if (this.renderer.debugMode) {
      console.info('ConditionalRenderPipe: should stop rendering', {
        element: element.name,
        value: true,
      })
    }

    return RenderOutput.notRenderable({ element })
  }
}