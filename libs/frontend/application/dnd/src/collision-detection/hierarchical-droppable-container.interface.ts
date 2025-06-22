import type { Rect } from '@codelab/frontend-shared-utils'
import type { UniqueIdentifier } from '@dnd-kit/core'

export interface HierarchicalDroppableContainer {
  ancestors: Array<UniqueIdentifier>
  children: Array<UniqueIdentifier>
  id: UniqueIdentifier
  level?: number
  parentId: UniqueIdentifier
  rect: Rect
}
