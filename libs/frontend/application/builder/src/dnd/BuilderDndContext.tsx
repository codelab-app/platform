import type { BuilderDragData } from '@codelab/frontend/abstract/application'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { DragEndEvent } from '@dnd-kit/core'
import type { PropsWithChildren } from 'react'

import { BuilderDndAction } from '@codelab/frontend/abstract/application'
import { ROOT_RENDER_CONTAINER_ID } from '@codelab/frontend/abstract/domain'
import { HierarchicalCollisionDetector } from '@codelab/frontend-application-dnd/collision-detection'
import {
  AutoDragOverlay,
  DropOverlay,
} from '@codelab/frontend-application-dnd/components'
import { useElementService } from '@codelab/frontend-application-element/services'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useCallback, useMemo } from 'react'

import { useDndDropHandler } from './useDndDropHandlers.hook'

const hierarchicalCollisionDetector = new HierarchicalCollisionDetector()

/**
 * Provides the DnD context for the builder
 */
const BuilderDndContext = ({ children }: PropsWithChildren) => {
  const { builderService } = useApplicationStore()
  const elementService = useElementService()
  const { handleCreateElement, handleMoveElement } = useDndDropHandler()

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 1 pixels before activating
    // fixes component item overlay issue when clicking
    activationConstraint: {
      distance: 1,
    },
  })

  const sensors = useSensors(mouseSensor)

  const autoScroll = useMemo(
    () => ({
      canScroll: (element: Element) => {
        const renderRoot = document.getElementById(ROOT_RENDER_CONTAINER_ID)

        return element.contains(renderRoot)
      },
    }),
    [],
  )

  const onDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const data = event.active.data.current as Maybe<BuilderDragData>

      switch (data?.action) {
        case BuilderDndAction.CreateElement:
          await handleCreateElement(event)
          break

        case BuilderDndAction.MoveElement:
          await handleMoveElement(event)
          break
      }
    },
    [builderService, elementService],
  )

  return (
    <DndContext
      // autoScroll={autoScroll}
      collisionDetection={hierarchicalCollisionDetector.detectCollisions.bind(
        hierarchicalCollisionDetector,
      )}
      onDragEnd={onDragEnd}
      sensors={sensors}
    >
      {children}
      <DropOverlay />
      <AutoDragOverlay />
    </DndContext>
  )
}

BuilderDndContext.displayName = 'BuilderDndContext'
export default BuilderDndContext
