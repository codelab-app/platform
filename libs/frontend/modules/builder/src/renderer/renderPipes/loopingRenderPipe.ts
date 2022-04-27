import { Element } from '@codelab/frontend/modules/element'
import {
  IPropData,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/shared/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import { get } from 'lodash'
import { Model, model, prop } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { getRenderService } from '../renderServiceContext'

@model('@codelab/LoopingRenderPipe')
export class LoopingRenderPipe
  extends Model({ next: prop<IRenderPipe>() })
  implements IRenderPipe
{
  render(element: Element, props: IPropData): ArrayOrSingle<IRenderOutput> {
    if (!element.renderForEachPropKey) {
      return this.next.render(element, props)
    }

    const value = LoopingRenderPipe.evaluateRenderForEach(element, props)
    const renderer = getRenderService(this)

    if (!Array.isArray(value)) {
      if (renderer.debugMode) {
        console.info(
          'LoopingRenderPipe: the specified prop value is not array',
          { element: element.name, value },
        )
      }

      return this.next.render(element, props)
    }

    if (renderer.debugMode) {
      console.info(
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
      .filter((output): output is IRenderOutput => !!output)
  }

  private static evaluateRenderForEach(element: Element, props: IPropData) {
    if (!element.renderForEachPropKey) {
      return null
    }

    return get(props, element.renderForEachPropKey)
  }
}
