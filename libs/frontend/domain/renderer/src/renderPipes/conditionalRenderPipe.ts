import type {
  IElement,
  IPropData,
  IRenderOutput,
  IRenderPipe,
  IStore,
} from '@codelab/frontend/abstract/core'
import { hasStateExpression } from '@codelab/frontend/shared/utils'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import type { ArrayOrSingle } from 'ts-essentials'
import { RenderOutput } from '../abstract/RenderOutput'
import { BaseRenderPipe } from './renderPipe.base'

@model('@codelab/ConditionalRenderPipe')
export class ConditionalRenderPipe
  extends ExtendedModel(BaseRenderPipe, {
    next: prop<IRenderPipe>(),
  })
  implements IRenderPipe
{
  render(element: IElement, props: IPropData): ArrayOrSingle<IRenderOutput> {
    const appStore = this.renderer.appStore.current

    if (ConditionalRenderPipe.shouldRender(element, appStore)) {
      return this.next.render(element, props)
    }

    if (this.renderer.debugMode) {
      console.info('ConditionalRenderPipe: should stop rendering', {
        element: element.name,
        value: element.renderIfExpression
          ? appStore.getByExpression(element.renderIfExpression)
          : undefined,
      })
    }

    return RenderOutput.empty({ elementId: element.id, stop: true })
  }

  private static shouldRender({ renderIfExpression }: IElement, store: IStore) {
    if (!renderIfExpression || !hasStateExpression(renderIfExpression)) {
      return true
    }

    return store.evaluateExpression(renderIfExpression)
  }
}
