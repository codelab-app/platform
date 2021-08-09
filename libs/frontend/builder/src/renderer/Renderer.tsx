import { ElementTree } from '../elementTree'
import { RenderContext, renderFactory } from './renderFactory'

/**
 * Wrapper element for {@link renderFactory}
 * @constructor
 */
export const Renderer = ({
  tree,
  context,
}: {
  tree: ElementTree
  context?: Omit<RenderContext, 'tree'>
}) => renderFactory(tree.getRoot(), { ...(context || {}), tree }) as any
