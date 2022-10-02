import type {
  IBuilderService,
  IElementTree,
  IRenderer,
  IRenderService,
  IStore,
} from '@codelab/frontend/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { Renderer } from './renderer.model'

@model('@codelab/RenderService')
export class RenderService
  extends Model({
    /**
     * These are renderers for the public
     */
    renderers: prop(() => objectMap<IRenderer>()),
  })
  implements IRenderService
{
  @modelAction
  addRenderer(
    id: string,
    pageTree: IElementTree,
    appTree: Nullable<IElementTree>,
    appStore: IStore,
    isBuilder?: boolean,
    set_selectedNode?: IBuilderService['set_selectedNode'],
  ) {
    const existing = this.renderers.get(id)

    if (!existing) {
      const renderer = Renderer.init(
        pageTree,
        appStore,
        appTree,
        isBuilder,
        set_selectedNode,
      )

      this.renderers.set(id, renderer)

      return renderer
    }

    return existing
  }
}
