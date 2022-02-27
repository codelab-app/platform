import { IElementGraph } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { ElementTree } from '@codelab/shared/core'

/**
 * Parses a ElementGraph and provides a tree interface
 */
export const useElementTree = (
  graph?: Nullable<IElementGraph>,
): ElementTree => {
  return new ElementTree(graph ?? { vertices: [], edges: [] })
}
