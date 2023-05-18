import type {
  IElement,
  IPropData,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/frontend/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import get from 'lodash/get'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import type { ArrayOrSingle } from 'ts-essentials'
import { BaseRenderPipe } from './render-pipe.base'

@model('@codelab/LoopingRenderPipe')
export class LoopingRenderPipe
  extends ExtendedModel(BaseRenderPipe, {
    next: prop<IRenderPipe>(),
  })
  implements IRenderPipe
{
  render(element: IElement, props: IPropData): ArrayOrSingle<IRenderOutput> {
    if (!element.renderForEachPropKey) {
      return this.next.render(element, props)
    }

    const value = LoopingRenderPipe.evaluateRenderForEach(element, props)

    if (!Array.isArray(value)) {
      if (this.renderer.debugMode) {
        console.info(
          'LoopingRenderPipe: the specified prop value is not array',
          { element: element.name, value },
        )
      }

      return this.next.render(element, props)
    }

    if (this.renderer.debugMode) {
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
      .filter((output): output is IRenderOutput => Boolean(output))
  }

  private static evaluateRenderForEach(element: IElement, props: IPropData) {
    if (!element.renderForEachPropKey) {
      return null
    }

    return get(props, element.renderForEachPropKey)
  }
}
