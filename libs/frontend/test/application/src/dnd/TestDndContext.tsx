import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import type { PropsWithChildren } from 'react'

import { HierarchicalCollisionDetector } from '@codelab/frontend-application-dnd/collision-detection'
import {
  AutoDragOverlay,
  DropOverlay,
} from '@codelab/frontend-application-dnd/components'
import { DndContext } from '@dnd-kit/core'

export const COLLISION_ALGORITHM_SPACING = 2

const hierarchicalCollisionDetector = new HierarchicalCollisionDetector({
  spacing: COLLISION_ALGORITHM_SPACING,
})

interface TestDndContextProps {
  onDragEnd?(event: DragEndEvent): void
  onDragStart?(event: DragStartEvent): void
}

/**
 * Provides the DnD context for the Test
 */
export const TestDndContext = ({
  children,
  onDragEnd,
  onDragStart,
}: PropsWithChildren<TestDndContextProps>) => {
  return (
    <DndContext
      collisionDetection={hierarchicalCollisionDetector.detectCollisions.bind(
        hierarchicalCollisionDetector,
      )}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
    >
      {children}

      <DropOverlay />
      <AutoDragOverlay />
    </DndContext>
  )
}
