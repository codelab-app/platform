import { Element } from '@codelab/frontend/modules/element'
import {
  IPropData,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/shared/abstract/core'
import { get, isString } from 'lodash'
import { Model, model, prop } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { RenderOutput } from '../abstract/RenderOutput'
import { getRenderService } from '../renderServiceContext'

@model('@codelab/ConditionalRenderPipe')
export class ConditionalRenderPipe
  extends Model({ next: prop<IRenderPipe>() })
  implements IRenderPipe
{
  render(element: Element, props: IPropData): ArrayOrSingle<IRenderOutput> {
    const renderer = getRenderService(this)

    if (ConditionalRenderPipe.shouldStopRendering(element, props)) {
      if (renderer.debugMode) {
        console.info('ConditionalRenderPipe: should stop rendering', {
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

  private static shouldStopRendering(element: Element, props: IPropData) {
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
