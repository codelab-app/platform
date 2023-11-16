import type { Collision } from '@dnd-kit/core'
import type { CollisionData } from './collision-data.interface'

export interface BuilderCollision extends Collision {
  data: CollisionData
}
