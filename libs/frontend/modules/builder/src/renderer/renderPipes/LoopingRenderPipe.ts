import { ElementModel } from '@codelab/frontend/modules/element'
import { PropsData, PropsDataByElementId } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { mergeProps } from '@codelab/shared/utils'
import { get } from 'lodash'
import { Model, model, prop } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { IRenderPipe } from '../abstract/IRenderPipe'
import { RenderOutput } from '../RenderOutput'

@model('@codelab/LoopingRenderPipe')
export class LoopingRenderPipe
  extends Model({ next: prop<IRenderPipe>() })
  implements IRenderPipe
{
  render(
    element: ElementModel,
    props: PropsData,
    extraElementProps?: PropsDataByElementId,
  ): Nullable<ArrayOrSingle<RenderOutput>> {
    const value = LoopingRenderPipe.evaluateRenderForEach(element, props)

    if (!Array.isArray(value)) {
      return this.next.render(element, props, extraElementProps)
    }

    return value
      .map((item, index) => {
        const itemProps = mergeProps(props, item, {
          key: `${props['key'] || element.id}-${index}`,
        })

        return this.next.render(element, itemProps, extraElementProps)
      })
      .filter((ro): ro is RenderOutput => !!ro)
  }

  private static evaluateRenderForEach(
    element: ElementModel,
    props: PropsData,
  ) {
    if (!element.renderForEachPropKey) {
      return null
    }

    return get(props, element.renderForEachPropKey)
  }
}
