import { ElementTreeGraphql } from '@codelab/frontend/modules/element'
import { RenderContext } from '@codelab/frontend/presenter/container'
import { renderFactory } from './renderFactory'

export const defaultRenderContext = (
  context: Omit<RenderContext<ElementTreeGraphql>, 'renderFactory'>,
): RenderContext<ElementTreeGraphql> => ({ ...context, renderFactory })
