import type {
  IRendererDto,
  IRendererModel,
  IRenderPipe,
  IRootStore,
} from '@codelab/frontend/abstract/application'
import { RendererType } from '@codelab/frontend/abstract/application'
import type {
  IElementTree,
  IRootDomainStore,
} from '@codelab/frontend/abstract/domain'
import type { DeepPartial } from 'fishery'
import { Factory } from 'fishery'
import { v4 } from 'uuid'
import { PassThroughRenderPipe, renderPipeFactory } from '../renderPipes'

/**
 * This factory is moved to application layer since the service cannot be in domain
 */
export const RendererTestFactory = (rootStore: Partial<IRootStore>) =>
  Factory.define<IRendererModel, IRendererDto>(({ transientParams }) => {
    const dto: IRendererDto = {
      // debugMode: transientParams.debugMode ?? false,
      elementTree: (transientParams.elementTree ?? {
        id: v4(),
      }) as IElementTree,
      id: transientParams.id ?? v4(),
      rendererType: transientParams.rendererType ?? RendererType.PageBuilder,
      renderPipe: (transientParams.renderPipe ??
        renderPipeFactory([PassThroughRenderPipe])) as IRenderPipe,
    }

    const model = rootStore.rendererService?.hydrate(dto)

    return model!
  })

export const rendererFactory =
  (rootStore: IRootDomainStore, rootApplicationStore: IRootStore) =>
  (dto: DeepPartial<IRendererDto>) => {
    const renderer: IRendererDto = {
      elementTree: (dto.elementTree ?? {
        id: v4(),
      }) as IElementTree,
      id: dto.id ?? v4(),
      rendererType: dto.rendererType ?? RendererType.PageBuilder,
      renderPipe: (dto.renderPipe ??
        renderPipeFactory([PassThroughRenderPipe])) as IRenderPipe,
    }

    return rootApplicationStore.rendererService.hydrate(renderer)
  }
