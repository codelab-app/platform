import { RenderContext } from '@codelab/frontend/shared'
import { renderFactory } from './renderFactory'

export const defaultRenderContext = (
  context: Omit<RenderContext, 'renderFactory'>,
): RenderContext => ({ ...context, renderFactory })
