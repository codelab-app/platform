import {
  IElement,
  IPropData,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/shared/abstract/core'
import { Model, model } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { RenderOutput } from '../abstract/RenderOutput'
import { getRenderService } from '../renderServiceContext'

/**
 * Fallback render pipe, returns null
 */
@model('@codelab/NullRenderPipe')
export class NullRenderPipe extends Model({}) implements IRenderPipe {
  render(element: IElement, props: IPropData): ArrayOrSingle<IRenderOutput> {
    const renderer = getRenderService(this)

    if (renderer.debugMode) {
      console.info(`NullRenderPipe: rendering null`, { element: element.name })
    }

    return RenderOutput.empty({ elementId: element.id, props })
  }
}
