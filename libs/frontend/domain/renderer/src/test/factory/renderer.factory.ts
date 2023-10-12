import type {
  IElementTree,
  IRenderer,
  IRenderPipe,
} from '@codelab/frontend/abstract/domain'
import { RendererType } from '@codelab/frontend/abstract/domain'
import { Factory } from 'fishery'
import type { Ref } from 'mobx-keystone'
import { v4 } from 'uuid'
import { Renderer } from '../../renderer.model'
import { PassThroughRenderPipe } from '../../renderPipes/pass-through-render-pipe'
import { renderPipeFactory } from '../../renderPipes/render-pipe.factory'
import { rootStore as testRootStore } from '../setup'

export default Factory.define<IRenderer>(({ params }) => {
  const renderer = new Renderer({
    debugMode: params.debugMode ?? false,
    elementTree: (params.elementTree ?? { id: v4() }) as Ref<IElementTree>,
    id: params.id ?? v4(),
    rendererType: params.rendererType ?? RendererType.PageBuilder,
    renderPipe: (params.renderPipe ??
      renderPipeFactory([PassThroughRenderPipe])) as IRenderPipe,
  })

  testRootStore.renderService.renderers.set(renderer.id, renderer)

  return renderer
})
