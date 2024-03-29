import type { BuilderDragData } from '@codelab/frontend/abstract/application'
import { BuilderDndAction } from '@codelab/frontend/abstract/application'
import { ROOT_RENDER_CONTAINER_ID } from '@codelab/frontend/abstract/domain'
import {
  AutoDragOverlay,
  DropIndicator,
  DropOverlay,
  HierarchicalCollisionDetector,
} from '@codelab/frontend/application/dnd'
import { useStore } from '@codelab/frontend/application/shared/store'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { DragEndEvent } from '@dnd-kit/core'
import { DndContext } from '@dnd-kit/core'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'
import React, { useCallback, useMemo } from 'react'
import { useDndDropHandler } from './useDndDropHandlers.hook'

const hierarchicalCollisionDetector = new HierarchicalCollisionDetector()

/**
 * Provides the DnD context for the builder
 */
const BuilderDndContext = observer<PropsWithChildren>(({ children }) => {
  const { builderService, elementService, rendererService } = useStore()

  const { handleCreateElement, handleMoveElement } = useDndDropHandler(
    elementService,
    rendererService,
  )

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
    >
      {children}

      <DropIndicator />
      <DropOverlay />
      <AutoDragOverlay />
    </DndContext>
  )
})

BuilderDndContext.displayName = 'BuilderDndContext'
export default BuilderDndContext
