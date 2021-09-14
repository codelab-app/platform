import {
  ElementFragment,
  ElementTreeGraphql,
} from '@codelab/frontend/modules/element'
import {
  RenderContext,
  RenderOutput,
} from '@codelab/frontend/presenter/container'

export type RenderPipe = (
  element: ElementFragment,
  context: RenderContext<ElementTreeGraphql>,
  props: Record<string, any>,
) => RenderOutput

export type RenderPipeFactory = (next: RenderPipe) => RenderPipe
