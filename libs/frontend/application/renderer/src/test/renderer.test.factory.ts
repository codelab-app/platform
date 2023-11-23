import type {
  IRendererDto,
  IRendererService,
  IRenderPipe,
} from '@codelab/frontend/abstract/application'
import { RendererType } from '@codelab/frontend/abstract/application'
import type { IPageModel } from '@codelab/frontend/abstract/domain'
import { v4 } from 'uuid'
import { PassThroughRenderPipe, renderPipeFactory } from '../renderPipes'

export const rendererFactory =
  (rendererService: IRendererService) => (dto: Partial<IRendererDto>) => {
    const renderer: IRendererDto = {
      containerNode: (dto.containerNode ?? {
        id: v4(),
      }) as IPageModel,
      id: dto.id ?? v4(),
      rendererType: dto.rendererType ?? RendererType.PageBuilder,
      renderPipe: (dto.renderPipe ??
        renderPipeFactory([PassThroughRenderPipe])) as IRenderPipe,
    }

    return rendererService.hydrate(renderer)
  }
