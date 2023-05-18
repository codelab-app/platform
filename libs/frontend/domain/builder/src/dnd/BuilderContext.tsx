import { ROOT_RENDER_CONTAINER_ID } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import type { Active, DragStartEvent } from '@dnd-kit/core'
import { DndContext, DragOverlay, pointerWithin } from '@dnd-kit/core'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'
import React, { useCallback, useMemo } from 'react'
import { useBuilderDnd } from './useBuilderDnd.hook'

/**
 * Provides the DnD context for the builder
 */
export const BuilderContext = observer<PropsWithChildren>(({ children }) => {
  const { builderService, elementService } = useStore()

  const { onDragEnd, onDragStart, sensors } = useBuilderDnd(
    builderService,
    elementService,
    builderService.activeElementTree,
  )

  const [draggedElement, setDraggedElement] = React.useState<Active | null>(
    null,
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

  const onDragStartHandler = useCallback(
    (event: DragStartEvent) => {
      setDraggedElement(event.active)
      onDragStart(event)
    },
    [onDragStart],
  )

  return (
    <DndContext
      autoScroll={autoScroll}
      collisionDetection={pointerWithin}
      onDragEnd={onDragEnd}
      onDragStart={onDragStartHandler}
      sensors={sensors}
    >
      {children}

      <DragOverlay dropAnimation={null}>
        {draggedElement && draggedElement.data.current?.overlayRenderer()}
      </DragOverlay>
    </DndContext>
  )
})

BuilderContext.displayName = 'BuilderContext'
