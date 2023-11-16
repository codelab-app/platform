import type { UniqueIdentifier } from '@dnd-kit/core'
import type { Rect } from '../geometry'

export interface BuilderDroppableContainer {
  ancestors: Array<UniqueIdentifier>
  children: Array<UniqueIdentifier>
  id: UniqueIdentifier
  level?: number
  parentId: UniqueIdentifier
  rect: Rect
}
