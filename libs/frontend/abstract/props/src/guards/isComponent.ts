import { ComponentFragment } from '@codelab/shared/codegen/graphql'
import { RenderNode } from '../renderNode'

export const isComponent = (node: RenderNode): node is ComponentFragment => {
  return node.__typename === 'Component'
}
