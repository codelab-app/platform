import {
  IElement,
  IPropData,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { RenderOutput } from '../abstract/RenderOutput'
import { BaseRenderPipe } from './renderPipe.base'

/**
 * Fallback render pipe, returns null
 */
@model('@codelab/NullRenderPipe')
export class NullRenderPipe
  extends ExtendedModel(BaseRenderPipe, {})
  implements IRenderPipe
{
  render(element: IElement, props: IPropData): ArrayOrSingle<IRenderOutput> {
    if (this.renderer.debugMode) {
      console.info(`NullRenderPipe: rendering null`, { element: element.name })
    }

    return RenderOutput.empty({ elementId: element.id, props })
  }
}
