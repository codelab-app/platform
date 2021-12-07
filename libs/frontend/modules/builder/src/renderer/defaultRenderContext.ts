import { renderPipeline } from './renderPipeline'
import { RenderContext } from './types/RenderTypes'

export const defaultRenderContext = (
  context: Omit<RenderContext, 'render'>,
): RenderContext => ({ ...context, render: renderPipeline })
