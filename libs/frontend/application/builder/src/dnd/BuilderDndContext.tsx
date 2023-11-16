import { ROOT_RENDER_CONTAINER_ID } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { Active, DragEndEvent } from '@dnd-kit/core'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'
import React, { useCallback, useMemo, useState } from 'react'
import { BuilderDndAction } from './builder-dnd-action'
import { type BuilderDragData } from './builder-drag-data.interface'
import { BuilderCollisionDetector } from './collision-detection'
import { DropIndicator } from './DropIndicator'
import { DropOverlay } from './DropOverlay'
import { useDndDropHandler } from './useDndDropHandlers.hook'

const builderCollisionDetector = new BuilderCollisionDetector()

/**
 * Provides the DnD context for the builder
 */
const BuilderDndContext = observer<PropsWithChildren>(({ children }) => {
  const { builderService, elementService } = useStore()
  const [active, setActive] = useState<Active | null>(null)

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
      collisionDetection={builderCollisionDetector.detectCollisions.bind(
        builderCollisionDetector,
      )}
      onDragStart={(event) => setActive(event.active)}
    >
      {children}

      <DropIndicator />
      <DropOverlay />
      <DragOverlay>{active?.data.current?.overlayRenderer?.()}</DragOverlay>
    </DndContext>
  )
})

BuilderDndContext.displayName = 'BuilderDndContext'
export default BuilderDndContext
