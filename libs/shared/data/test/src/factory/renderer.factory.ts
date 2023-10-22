import type { RendererProps } from '@codelab/frontend/abstract/application'
import type { IElementTree } from '@codelab/frontend/abstract/domain'
import { RendererType } from '@codelab/frontend/abstract/domain'
import { Factory } from 'fishery'
import { v4 } from 'uuid'
// import { PassThroughRenderPipe } from '../../../../../frontend/application/renderer/src/renderPipes/pass-through-render-pipe'
// import { renderPipeFactory } from '../../../../../frontend/application/renderer/src/renderPipes/render-pipe.factory'

export default Factory.define<RendererProps>(({ params }) => {
  const rendererProps: RendererProps = {
    // debugMode: params.debugMode ?? false,
    elementTree: (params.elementTree ?? {
      id: v4(),
    }) as IElementTree,
    id: params.id ?? v4(),
    rendererType: params.rendererType ?? RendererType.PageBuilder,
    // renderPipe: (params.renderPipe ??
    //   renderPipeFactory([PassThroughRenderPipe])) as IRenderPipe,
  }

  // testRootStore.renderService.renderers.set(renderer.id, renderer)

  return rendererProps
})
