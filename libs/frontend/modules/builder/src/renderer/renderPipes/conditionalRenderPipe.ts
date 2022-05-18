import { Element } from '@codelab/frontend/modules/element'
import {
  IPropData,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/shared/abstract/core'
import { get, isString } from 'lodash'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { RenderOutput } from '../abstract/RenderOutput'
import { BaseRenderPipe } from './renderPipe.base'

@model('@codelab/ConditionalRenderPipe')
export class ConditionalRenderPipe
  extends ExtendedModel(BaseRenderPipe, { next: prop<IRenderPipe>() })
  implements IRenderPipe
{
  render(element: Element, props: IPropData): ArrayOrSingle<IRenderOutput> {
    if (ConditionalRenderPipe.shouldStopRendering(element, props)) {
      if (this.renderer.debugMode) {
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
