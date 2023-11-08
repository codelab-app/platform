import type {
  IRenderOutput,
  IRenderPipe,
  IRuntimeElementModel,
} from '@codelab/frontend/abstract/application'
import { isComponent } from '@codelab/frontend/abstract/domain'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import { BaseRenderPipe } from './render-pipe.base'

@model('@codelab/ComponentRenderPipe')
export class ComponentRenderPipe
  extends ExtendedModel(BaseRenderPipe, {
    next: prop<IRenderPipe>(),
  })
  implements IRenderPipe
{
  render(runtimeElement: IRuntimeElementModel): IRenderOutput {
    const { element } = runtimeElement

    if (!isComponent(element.renderType.current)) {
      return this.next.render(runtimeElement)
    }

    const component = element.renderType.current

    runtimeElement.addRuntimeChild(component)

    if (this.renderer.debugMode) {
      console.info(
        `ComponentRenderPipe: rendering component for element:${element.slug}`,
        { element: element.name },
      )
    }

    return this.next.render(runtimeElement)
  }
}
