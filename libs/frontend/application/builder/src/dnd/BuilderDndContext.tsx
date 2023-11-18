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
  const { builderService, elementService } = useStore()

  const { handleCreateElement, handleMoveElement } = useDndDropHandler(
    elementService,
    // TODO: figure out of elementTree is needed here
    undefined,
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

      const shouldCreate =
        data?.action === BuilderDndAction.CreateElement &&
        data.createElementInput !== undefined

      const shouldMove = data?.action === BuilderDndAction.MoveElement

      if (shouldCreate) {
        await handleCreateElement(event)
      } else if (shouldMove) {
        await handleMoveElement(event)
      }
    },
    [builderService, elementService],
  )

  return (
    <DndContext
      // autoScroll={autoScroll}
      // onDragEnd={onDragEnd}
      collisionDetection={hierarchicalCollisionDetector.detectCollisions.bind(
        hierarchicalCollisionDetector,
      )}
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
