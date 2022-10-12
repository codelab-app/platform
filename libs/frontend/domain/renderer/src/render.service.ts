import type {
  IBuilderService,
  IComponentService,
  IElementService,
  IElementTree,
  IRenderer,
  IRenderService,
  IStore,
  RendererProps,
} from '@codelab/frontend/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop, Ref } from 'mobx-keystone'
import { Renderer } from './renderer.model'

@model('@codelab/RenderService')
export class RenderService
  extends Model({
    /**
     * These are renderers for the public
     */
    renderers: prop(() => objectMap<IRenderer>()),

    _elementService: prop<Ref<IElementService>>(),
    _componentService: prop<Ref<IComponentService>>(),
  })
  implements IRenderService
{
  @computed
  get elementService() {
    return this._elementService.current
  }

  @computed
  get componentService() {
    return this._componentService.current
  }

  @modelAction
  addRenderer(props: RendererProps & { id: string }) {
    const existing = this.renderers.get(props.id)

    if (!existing) {
      const renderer = Renderer.init(props)

      this.renderers.set(props.id, renderer)

      return renderer
    }

    return existing
  }
}
