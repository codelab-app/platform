import type {
  IBuilderService,
  IElementService,
  IElementTree,
} from '@codelab/frontend/abstract/core'
import { ROOT_RENDER_CONTAINER_ID } from '@codelab/frontend/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { Active, DragStartEvent } from '@dnd-kit/core'
import { DndContext, DragOverlay, pointerWithin } from '@dnd-kit/core'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'
import React, { useCallback, useMemo } from 'react'
import { useBuilderDnd } from './useBuilderDnd'

/**
 * Provides the DnD context for the builder
 */
export const BuilderContext = observer<
  PropsWithChildren<{
    builderService: IBuilderService
    elementService: IElementService
    elementTree: Maybe<IElementTree>
  }>
>(({ builderService, children, elementService, elementTree }) => {
  const { onDragEnd, onDragStart, sensors } = useBuilderDnd(
    builderService,
    elementService,
    elementTree,
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
