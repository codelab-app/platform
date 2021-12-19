import { RenderContext } from '../pipes'
import { renderPipeline } from '../pipes/renderPipeline'

export const defaultRenderContext = (
  context: Omit<RenderContext, 'render'>,
): RenderContext => ({ ...context, render: renderPipeline })
