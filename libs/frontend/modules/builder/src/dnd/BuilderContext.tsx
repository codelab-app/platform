import { withProvider } from '@codelab/frontend/presenter/container'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import React, { PropsWithChildren } from 'react'
import tw from 'twin.macro'
import { builderCollisionDetection } from './builderCollisionDetection'
import { useBuilderDnd } from './useBuilderDnd'

export const BuilderContext = ({
  children,
}: PropsWithChildren<Record<string, unknown>>) => {
  const { onDragEnd, onDragStart, currentlyDragging } = useBuilderDnd()

  return (
    <DndContext
      collisionDetection={builderCollisionDetection}
      onDragEnd={(e) => {
        onDragEnd(e)
      }}
      onDragStart={(e) => {
        onDragStart(e)
      }}
      autoScroll={{
        canScroll: (e) => {
          const renderRoot = document.getElementById('render-root')

          return e.contains(renderRoot)
        },
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
