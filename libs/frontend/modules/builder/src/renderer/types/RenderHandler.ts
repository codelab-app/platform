import { ElementTreeGraphql } from '@codelab/frontend/modules/element'
import {
  RenderContext,
  RenderOutput,
} from '@codelab/frontend/presenter/container'
import { RenderNode } from './RenderNode'

export type RenderHandler<TNode extends RenderNode = RenderNode> = (
  node: TNode,
  metadata: RenderContext<ElementTreeGraphql>,
) => RenderOutput
