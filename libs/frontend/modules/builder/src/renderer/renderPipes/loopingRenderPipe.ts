import {
  IElement,
  IPropData,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/shared/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import { get } from 'lodash'
import { ExtendedModel, model, modelClass, prop } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { BaseRenderPipe } from './renderPipe.base'

@model('@codelab/LoopingRenderPipe')
export class LoopingRenderPipe
  extends ExtendedModel(modelClass(BaseRenderPipe), {
    next: prop<IRenderPipe>(),
  })
  implements IRenderPipe
{
  render(element: IElement, props: IPropData): ArrayOrSingle<IRenderOutput> {
    if (!element.renderForEachPropKey) {
      return this.next.current.render(element, props)
    }

    const value = LoopingRenderPipe.evaluateRenderForEach(element, props)

    if (!Array.isArray(value)) {
      if (this.renderService.debugMode) {
        console.info(
          'LoopingRenderPipe: the specified prop value is not array',
          { element: element.name, value },
        )
      }

      return this.next.current.render(element, props)
    }

    if (this.renderService.debugMode) {
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

        return this.next.current.render(element, itemProps)
      })
      .filter((output): output is IRenderOutput => !!output)
  }

  private static evaluateRenderForEach(element: IElement, props: IPropData) {
    if (!element.renderForEachPropKey) {
      return null
    }

    return get(props, element.renderForEachPropKey)
  }
}
