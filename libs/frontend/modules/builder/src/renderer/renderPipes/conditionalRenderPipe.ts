import {
  IElement,
  IPropData,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/shared/abstract/core'
import { get, isString } from 'lodash'
import { ExtendedModel, model, modelClass, prop } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { RenderOutput } from '../abstract/RenderOutput'
import { BaseRenderPipe } from './renderPipe.base'

@model('@codelab/ConditionalRenderPipe')
export class ConditionalRenderPipe
  extends ExtendedModel(modelClass(BaseRenderPipe), {
    next: prop<IRenderPipe>(),
  })
  implements IRenderPipe
{
  render(element: IElement, props: IPropData): ArrayOrSingle<IRenderOutput> {
    if (ConditionalRenderPipe.shouldStopRendering(element, props)) {
      if (this.renderService.debugMode) {
        console.info('ConditionalRenderPipe: should stop rendering', {
          element: element.name,
          value: element.renderIfPropKey
            ? get(props, element.renderIfPropKey)
            : undefined,
        })
      }

      return RenderOutput.empty({ elementId: element.id })
    }

    return this.next.current.render(element, props)
  }

  private static shouldStopRendering(element: IElement, props: IPropData) {
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
