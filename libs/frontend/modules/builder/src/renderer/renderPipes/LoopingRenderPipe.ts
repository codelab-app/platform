import { Element } from '@codelab/frontend/modules/element'
import { IPropData } from '@codelab/shared/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import { get } from 'lodash'
import { Model, model, prop } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { IRenderPipe } from '../abstract/IRenderPipe'
import { RenderOutput } from '../abstract/RenderOutput'
import { getRenderContext } from '../renderServiceContext'

@model('@codelab/LoopingRenderPipe')
export class LoopingRenderPipe
  extends Model({ next: prop<IRenderPipe>() })
  implements IRenderPipe
{
  render(element: Element, props: IPropData): ArrayOrSingle<RenderOutput> {
    if (!element.renderForEachPropKey) {
      return this.next.render(element, props)
    }

    const value = LoopingRenderPipe.evaluateRenderForEach(element, props)
    const renderer = getRenderContext(this)

    if (!Array.isArray(value)) {
      if (renderer.debugMode) {
        console.log(
          'LoopingRenderPipe: the specified prop value is not array',
          { element: element.name, value },
        )
      }

      return this.next.render(element, props)
    }

    if (renderer.debugMode) {
      console.log(
        `LoopingRenderPipe: mapping the element ${value.length} times`,
        { element: element.name, value },
      )
    }

    return value
      .map((item, index) => {
        const itemProps = mergeProps(props, item, {
          key: `${props['key'] || element.id}-${index}`,
        })

        return this.next.render(element, itemProps)
      })
      .filter((ro): ro is RenderOutput => !!ro)
  }

  private static evaluateRenderForEach(element: Element, props: IPropData) {
    if (!element.renderForEachPropKey) {
      return null
    }

    return get(props, element.renderForEachPropKey)
  }
}
