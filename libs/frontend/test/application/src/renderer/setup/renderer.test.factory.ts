import type {
  IRendererDto,
  IRendererService,
} from '@codelab/frontend/abstract/application'
import { RendererType } from '@codelab/frontend/abstract/application'
import type { IPageModel } from '@codelab/frontend/abstract/domain'
import { v4 } from 'uuid'

export const rendererFactory =
  (rendererService: IRendererService) => (dto: Partial<IRendererDto>) => {
    const renderer: IRendererDto = {
      containerNode: (dto.containerNode ?? {
        id: v4(),
      }) as IPageModel,
      id: dto.id ?? v4(),
      rendererType: dto.rendererType ?? RendererType.PageBuilder,
      urlSegments: dto.urlSegments ?? undefined,
    }

    return rendererService.hydrate(renderer)
  }
