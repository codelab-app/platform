import type { IRootStore } from '@codelab/frontend/abstract/application'
import type {
  IElementTree,
  IRendererDto,
  IRenderPipe,
} from '@codelab/frontend/abstract/domain'
import { RendererType } from '@codelab/frontend/abstract/domain'
import { Factory } from 'fishery'
import { v4 } from 'uuid'
import { PassThroughRenderPipe } from '../renderPipes/pass-through-render-pipe'
import { renderPipeFactory } from '../renderPipes/render-pipe.factory'

export const RendererTestFactory = (rootStore: Partial<IRootStore>) =>
  Factory.define<IRendererDto>(({ params }) => {
    const dto: IRendererDto = {
      // debugMode: params.debugMode ?? false,
      elementTree: (params.elementTree ?? {
        id: v4(),
      }) as IElementTree,
      id: params.id ?? v4(),
      rendererType: params.rendererType ?? RendererType.PageBuilder,
      renderPipe: (params.renderPipe ??
        renderPipeFactory([PassThroughRenderPipe])) as IRenderPipe,
    }

    rootStore.rendererService?.hydrate(dto)

    return dto
  })
