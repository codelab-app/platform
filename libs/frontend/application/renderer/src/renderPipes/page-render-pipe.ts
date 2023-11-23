import type {
  IRenderOutput,
  IRenderPipe,
  IRuntimeElementModel,
} from '@codelab/frontend/abstract/application'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import { BaseRenderPipe } from './render-pipe.base'

@model('@codelab/PageRenderPipe')
export class PageRenderPipe
  extends ExtendedModel(BaseRenderPipe, {
    next: prop<IRenderPipe>(),
  })
  implements IRenderPipe
{
  render(runtimeElement: IRuntimeElementModel): IRenderOutput {
    if (!runtimeElement.isPageContentContainer) {
      return this.next.render(runtimeElement)
    }

    // Add regular page to container element's runtime children
    runtimeElement.addRuntimeChild(this.renderer.containerNode.current)

    if (this.renderer.debugMode) {
      console.info(
        `PageRenderPipe: rendering page  ${this.renderer.containerNode.current.name}`,
      )
    }

    return this.next.render(runtimeElement)
  }
}
