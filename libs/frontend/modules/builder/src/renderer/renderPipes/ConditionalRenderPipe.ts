import { Element } from '@codelab/frontend/modules/element'
import { PropsData } from '@codelab/shared/abstract/core'
import { get, isString } from 'lodash'
import { Model, model, prop } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { IRenderPipe } from '../abstract/IRenderPipe'
import { RenderOutput } from '../abstract/RenderOutput'
import { getRenderContext } from '../renderContext'

@model('@codelab/ConditionalRenderPipe')
export class ConditionalRenderPipe
  extends Model({ next: prop<IRenderPipe>() })
  implements IRenderPipe
{
  render(element: Element, props: PropsData): ArrayOrSingle<RenderOutput> {
    const renderer = getRenderContext(this)

    if (ConditionalRenderPipe.shouldStopRendering(element, props)) {
      if (renderer.debugMode) {
        console.log('ConditionalRenderPipe: should stop rendering', {
          element: element.name,
          value: element.renderIfPropKey
            ? get(props, element.renderIfPropKey)
            : undefined,
        })
      }

      return RenderOutput.empty({ elementId: element.id })
    }

    return this.next.render(element, props)
  }

  private static shouldStopRendering(element: Element, props: PropsData) {
    if (!element.renderIfPropKey) {
      return false
    }

    const value = get(props, element.renderIfPropKey)

    if (isString(value) && value.trim().toLowerCase() === 'false') {
      return true
    }

    return !value
  }
}
