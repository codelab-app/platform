import { ElementTreeGraphql } from '@codelab/frontend/modules/element'
import { RenderContext } from '@codelab/frontend/presenter/container'
import { ReactElement } from 'react'
import { RenderNode } from './RenderNode'

export type RenderHandler<TNode extends RenderNode = RenderNode> = (
  node: TNode,
  metadata: RenderContext<ElementTreeGraphql>,
) => ReactElement | null
