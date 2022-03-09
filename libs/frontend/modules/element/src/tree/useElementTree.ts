import { IElementGraph } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { ElementTree } from '@codelab/shared/core'
import { useMemo } from 'react'

/**
 * Parses a ElementGraph and provides a tree interface
 */
export const useElementTree = (
  graph?: Nullable<IElementGraph>,
): ElementTree => {
  return useMemo(
    () => new ElementTree(graph ?? { vertices: [], edges: [] }),
    [graph],
  )
}
