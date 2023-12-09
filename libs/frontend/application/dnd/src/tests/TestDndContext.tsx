import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { DndContext } from '@dnd-kit/core'
import type { PropsWithChildren } from 'react'
import React from 'react'
import { AutoDragOverlay } from '../AutoDragOverlay'
import { HierarchicalCollisionDetector } from '../collision-detection'
import { DropIndicator } from '../DropIndicator'
import { DropOverlay } from '../DropOverlay'

export const COLLISION_ALGORITHM_SPACING = 5

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

      <DropIndicator />
      <DropOverlay />
      <AutoDragOverlay />
    </DndContext>
  )
}
