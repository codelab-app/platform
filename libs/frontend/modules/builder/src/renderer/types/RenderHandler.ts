import { RenderNode } from '@codelab/frontend/abstract/core'
import {
  RenderContext,
  RenderOutput,
} from '@codelab/frontend/presenter/container'

export type RenderHandler = (
  node: RenderNode,
  metadata: RenderContext,
) => RenderOutput
