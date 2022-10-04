import {
  IElement,
  IPropData,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/frontend/abstract/core'
import get from 'lodash/get'
import isString from 'lodash/isString'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { RenderOutput } from '../abstract/RenderOutput'
import { BaseRenderPipe } from './renderPipe.base'

const falseValues = ['false', 'undefined', 'null', '0']

@model('@codelab/ConditionalRenderPipe')
export class ConditionalRenderPipe
  extends ExtendedModel(BaseRenderPipe, {
    next: prop<IRenderPipe>(),
  })
  implements IRenderPipe
{
  render(element: IElement, props: IPropData): ArrayOrSingle<IRenderOutput> {
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

  private static shouldStopRendering(element: IElement, props: IPropData) {
    if (!element.renderIfPropKey) {
      return false
    }

    const value = get(props, element.renderIfPropKey)

    if (isString(value) && falseValues.includes(value.trim().toLowerCase())) {
      return true
    }

    return !value
  }
}
