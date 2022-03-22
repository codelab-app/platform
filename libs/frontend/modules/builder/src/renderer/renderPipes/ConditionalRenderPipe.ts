import { ElementModel } from '@codelab/frontend/modules/element'
import { PropsData, PropsDataByElementId } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { get, isString } from 'lodash'
import { Model, model, prop } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { IRenderPipe } from '../abstract/IRenderPipe'
import { RenderOutput } from '../RenderOutput'

@model('@codelab/ConditionalRenderPipe')
export class ConditionalRenderPipe
  extends Model({ next: prop<IRenderPipe>() })
  implements IRenderPipe
{
  render(
    element: ElementModel,
    props: PropsData,
    extraElementProps?: PropsDataByElementId,
  ): Nullable<ArrayOrSingle<RenderOutput>> {
    if (ConditionalRenderPipe.shouldStopRendering(element, props)) {
      return null
    }

    return this.next.render(element, props, extraElementProps)
  }

  private static shouldStopRendering(element: ElementModel, props: PropsData) {
    if (!element.renderIfPropKey) {
      return true
    }

    const value = get(props, element.renderIfPropKey)

    if (isString(value) && value.trim().toLowerCase() === 'false') {
      return true
    }

    return !value
  }
}
