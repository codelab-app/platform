import { Element } from '@codelab/frontend/modules/element'
import { IPropData } from '@codelab/shared/abstract/core'
import { Model, model } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { IRenderPipe } from '../abstract/IRenderPipe'
import { RenderOutput } from '../abstract/RenderOutput'
import { getRenderContext } from '../renderServiceContext'

/**
 * Fallback render pipe, returns null
 */
@model('codelab/NullRenderPipe')
export class NullRenderPipe extends Model({}) implements IRenderPipe {
  render(element: Element, props: IPropData): ArrayOrSingle<RenderOutput> {
    const renderer = getRenderContext(this)

    if (renderer.debugMode) {
      console.log(`NullRenderPipe: rendering null`, { element: element.name })
    }

    return RenderOutput.empty({ elementId: element.id, props })
  }
}
