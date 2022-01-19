import { ROOT_RENDER_CONTAINER_ID } from '@codelab/frontend/abstract/core'
import { withProvider } from '@codelab/frontend/presenter/container'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import React, { PropsWithChildren } from 'react'
import tw from 'twin.macro'
import { builderCollisionDetection } from './builderCollisionDetection'
import { useBuilderDnd } from './useBuilderDnd'

export const BuilderContext = ({ children }: PropsWithChildren<unknown>) => {
  const { onDragEnd, onDragStart, currentlyDragging } = useBuilderDnd()

  return (
    <DndContext
      autoScroll={{
        canScroll: (e) => {
          const renderRoot = document.getElementById(ROOT_RENDER_CONTAINER_ID)

          return e.contains(renderRoot)
        },
      }}
      collisionDetection={builderCollisionDetection}
      onDragEnd={(e) => {
        onDragEnd(e)
      }}
      onDragStart={(e) => {
        onDragStart(e)
      }}
    >
      {children}

      <DragOverlay dropAnimation={null}>
        {currentlyDragging ? (
          <div css={tw`p-2 text-sm border-gray-200 border w-24`}>
            {currentlyDragging.createElementInput.name}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export const withBuilderContext = withProvider(BuilderContext)
