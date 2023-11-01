import type { IRootStore } from '@codelab/frontend/abstract/application'
import type {
  IElementTree,
  IRendererDto,
  IRendererModel,
  IRenderPipe,
} from '@codelab/frontend/abstract/domain'
import { RendererType } from '@codelab/frontend/abstract/application'
import {
  PassThroughRenderPipe,
  renderPipeFactory,
} from '@codelab/frontend/domain/renderer'
import { Factory } from 'fishery'
import { v4 } from 'uuid'

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
