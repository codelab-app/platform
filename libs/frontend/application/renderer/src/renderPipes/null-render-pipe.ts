import type {
  IRenderOutput,
  IRenderPipe,
  IRuntimeElement,
} from '@codelab/frontend/abstract/application'
import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { IPropData } from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import { RenderOutput } from '../utils'
import { BaseRenderPipe } from './render-pipe.base'

/**
 * Fallback render pipe, returns null
 */
@model('@codelab/NullRenderPipe')
export class NullRenderPipe
  extends ExtendedModel(BaseRenderPipe, {})
  implements IRenderPipe
{
  render(runtimeElement: IRuntimeElement): IRenderOutput {
    const { element, props } = runtimeElement

    if (this.renderer.debugMode) {
      console.info(`NullRenderPipe: rendering null`, { element: element.name })
    }

    return RenderOutput.empty({ element, props })
  }
}
