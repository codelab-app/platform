import type {
  IRenderOutput,
  IRenderPipe,
  IRuntimeElementModel,
} from '@codelab/frontend-abstract-application'

import { ExtendedModel, model } from 'mobx-keystone'

import { RenderOutput } from './render-output'
import { BaseRenderPipe } from './render-pipe.base'

/**
 * Fallback render pipe, returns null
 */
@model('@codelab/NullRenderPipe')
export class NullRenderPipe
  extends ExtendedModel(BaseRenderPipe, {})
  implements IRenderPipe
{
  render(runtimeElement: IRuntimeElementModel): IRenderOutput {
    const element = runtimeElement.element.current

    if (this.renderer.debugMode) {
      console.info('NullRenderPipe: rendering null', { element: element.name })
    }

    return RenderOutput.empty({
      props: runtimeElement.runtimeProps,
      runtimeElement,
    })
  }
}
