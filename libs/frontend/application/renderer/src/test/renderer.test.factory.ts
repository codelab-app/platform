import type {
  IRendererDto,
  IRendererService,
} from '@codelab/frontend-abstract-application'
import type { IPageModel } from '@codelab/frontend-abstract-domain'

import { RendererType } from '@codelab/frontend-abstract-application'
import { v4 } from 'uuid'

export const rendererFactory =
  (rendererService: IRendererService) => (dto: Partial<IRendererDto>) => {
    const renderer: Omit<IRendererDto, 'runtimeRootContainerNode'> = {
      containerNode: (dto.containerNode ?? {
        id: v4(),
      }) as IPageModel,
      id: dto.id ?? v4(),
      rendererType: dto.rendererType ?? RendererType.PageBuilder,
    }

    return rendererService.hydrate(renderer)
  }
