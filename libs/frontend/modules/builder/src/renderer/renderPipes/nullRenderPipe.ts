import {
  IElement,
  IPropData,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/shared/abstract/core'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { RenderOutput } from '../abstract/RenderOutput'
import { BaseRenderPipe } from './renderPipe.base'

/**
 * Fallback render pipe, returns null
 */
@model('@codelab/NullRenderPipe')
export class NullRenderPipe
  extends ExtendedModel(modelClass(BaseRenderPipe), {})
  implements IRenderPipe
{
  render(element: IElement, props: IPropData): ArrayOrSingle<IRenderOutput> {
    if (this.renderService.debugMode) {
      console.info(`NullRenderPipe: rendering null`, { element: element.name })
    }

    return RenderOutput.empty({ elementId: element.id, props })
  }
}
