import type {
  IElement,
  IPropData,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/frontend/abstract/core'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import type { ArrayOrSingle } from 'ts-essentials'
import { shouldRenderElement } from '../utils'
import { BaseRenderPipe } from './render-pipe.base'
import { RenderOutput } from '../utils'

@model('@codelab/ConditionalRenderPipe')
export class ConditionalRenderPipe
  extends ExtendedModel(BaseRenderPipe, {
    next: prop<IRenderPipe>(),
  })
  implements IRenderPipe
{
  render(element: IElement, props: IPropData): ArrayOrSingle<IRenderOutput> {
    if (shouldRenderElement(element, props)) {
      return this.next.render(element, props)
    }

    if (this.renderer.debugMode) {
      console.info('ConditionalRenderPipe: should stop rendering', {
        element: element.name,
        value: true,
      })
    }

    return RenderOutput.empty({ element })
  }
}
