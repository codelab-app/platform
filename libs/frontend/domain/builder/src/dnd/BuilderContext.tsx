import {
  IBuilderService,
  IElementService,
  IElementTree,
  ROOT_RENDER_CONTAINER_ID,
} from '@codelab/frontend/abstract/core'
import { Active, DndContext, DragOverlay, pointerWithin } from '@dnd-kit/core'
import { observer } from 'mobx-react-lite'
import React, { PropsWithChildren } from 'react'
import { useBuilderDnd } from './useBuilderDnd'

/**
 * Provides the DnD context for the builder
 */
export const BuilderContext = observer<
  PropsWithChildren<{
    elementService: IElementService
    builderService: IBuilderService
    elementTree?: IElementTree
  }>
>(({ children, elementService, builderService, elementTree }) => {
  const { onDragEnd, onDragStart } = useBuilderDnd(
    builderService,
    elementService,
    elementTree,
  )

  const [draggedElement, setDraggedElement] = React.useState<Active | null>(
    null,
  )

  return (
    <DndContext
      autoScroll={{
        canScroll: (e) => {
          const renderRoot = document.getElementById(ROOT_RENDER_CONTAINER_ID)

          return e.contains(renderRoot)
        },
      }}
      collisionDetection={pointerWithin}
      onDragEnd={(e) => {
        onDragEnd(e)
      }}
      onDragStart={(e) => {
        setDraggedElement(e.active)
        onDragStart(e)
      }}
    >
      {children}

      <DragOverlay dropAnimation={null}>
        {draggedElement && draggedElement.data.current?.overlayRenderer()}
      </DragOverlay>
    </DndContext>
  )
})

BuilderContext.displayName = 'BuilderContext'
