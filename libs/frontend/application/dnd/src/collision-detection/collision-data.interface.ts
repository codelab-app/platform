import type { UniqueIdentifier } from '@dnd-kit/core'

export interface CollisionData {
  childDroppableAfterPointer?: UniqueIdentifier
  childDroppableBeforePointer?: UniqueIdentifier
}
