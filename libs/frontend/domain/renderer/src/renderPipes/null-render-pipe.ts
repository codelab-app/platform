import type {
  IElementModel,
  IPropData,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/frontend/abstract/core'
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
  render(element: IElementModel, props: IPropData): IRenderOutput {
    if (this.renderer.debugMode) {
      console.info(`NullRenderPipe: rendering null`, { element: element.name })
    }

    return RenderOutput.empty({ element, props })
  }
}
