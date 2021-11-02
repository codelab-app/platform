import { RenderContext } from '@codelab/frontend/presenter/container'
import { renderFactory } from './renderFactory'

export const defaultRenderContext = (
  context: Omit<RenderContext, 'renderFactory'>,
): RenderContext => ({ ...context, renderFactory })
