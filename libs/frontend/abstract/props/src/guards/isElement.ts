import { ElementFragment } from '@codelab/shared/codegen/graphql'
import { RenderNode } from '../renderNode'

export const isElement = (node: RenderNode): node is ElementFragment => {
  return node.__typename === 'Element'
}
